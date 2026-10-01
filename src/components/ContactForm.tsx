'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import emailjs from '@emailjs/browser'
import { SUBJECT_IDS, type SubjectId } from '@/content/contact'

type Labels = {
  title: string
  name: string
  email: string
  company: string
  subject: string
  message: string
  messageHint: string
  submit: string
  sending: string
  success: string
  error: string
  required: string
  invalidEmail: string
  privacy: string
  privacyLink: string
}

type Props = { labels: Labels; subjects: Record<SubjectId, string>; chips: Record<SubjectId, string>; privacyHref: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'message', string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export default function ContactForm({ labels, subjects, chips, privacyHref }: Props) {
  const [subject, setSubject] = useState<SubjectId>('projeto')
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const statusRef = useRef<HTMLParagraphElement>(null)

  // Assunto pré-preenchido a partir de ?assunto=… (as páginas continuam estáticas).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('assunto')
    if (q && (SUBJECT_IDS as readonly string[]).includes(q)) setSubject(q as SubjectId)
  }, [])

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form)
    const e: Errors = {}
    if (!String(data.get('name') ?? '').trim()) e.name = labels.required
    const email = String(data.get('email') ?? '').trim()
    if (!email) e.email = labels.required
    else if (!EMAIL_RE.test(email)) e.email = labels.invalidEmail
    if (!String(data.get('message') ?? '').trim()) e.message = labels.required
    return e
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = ev.currentTarget
    const e = validate(form)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const data = new FormData(form)
    const company = String(data.get('company') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subjectId = String(data.get('subject') ?? 'outro') as SubjectId
    const subject = subjects[subjectId] ?? subjects.outro
    setStatus('sending')
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: String(data.get('name')).trim(),
          from_email: String(data.get('email')).trim(),
          reply_to: String(data.get('email')).trim(),
          subject,
          company,
          // O modelo de email atual só mostra {{message}}: o assunto e a empresa vão também no texto.
          message: `[${subject}]${company ? ` (${company})` : ''}\n\n${message}`,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      )
      setStatus('sent')
      form.reset()
      setSubject('projeto')
    } catch {
      setStatus('error')
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  const field = 'mt-2 block w-full rounded-2xl border border-linha bg-papel/60 px-3.5 py-3 text-body text-tinta placeholder:text-grafite/70 focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/30 aria-[invalid=true]:border-estado-erro'
  const errorText = 'mt-1.5 text-small text-estado-erro'

  return (
    <form noValidate onSubmit={onSubmit} aria-labelledby="form-titulo">
      <h2 id="form-titulo" className="t-h2">
        {labels.title}
      </h2>

      <div className="mt-8 space-y-6">
        <fieldset>
          <legend className="font-semibold">{labels.subject}</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUBJECT_IDS.map((id) => (
              <label key={id} className="subject-chip">
                <input type="radio" name="subject" value={id} checked={subject === id} onChange={() => setSubject(id)} className="sr-only" />
                <span>{chips[id]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-name" className="font-semibold">
              {labels.name}
            </label>
            <input id="cf-name" name="name" type="text" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} className={field} />
            {errors.name && <p id="cf-name-err" className={errorText}>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="cf-email" className="font-semibold">
              {labels.email}
            </label>
            <input id="cf-email" name="email" type="email" autoComplete="email" inputMode="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} className={field} />
            {errors.email && <p id="cf-email-err" className={errorText}>{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="cf-company" className="font-semibold">
            {labels.company}
          </label>
          <input id="cf-company" name="company" type="text" autoComplete="organization" className={field} />
        </div>

        <div>
          <label htmlFor="cf-message" className="font-semibold">
            {labels.message}
          </label>
          <p id="cf-message-hint" className="text-small text-grafite">
            {labels.messageHint}
          </p>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            required
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'cf-message-hint cf-message-err' : 'cf-message-hint'}
            className={`${field} resize-y`}
          />
          {errors.message && <p id="cf-message-err" className={errorText}>{errors.message}</p>}
        </div>

        <p className="text-small text-grafite">
          {labels.privacy}{' '}
          <a href={privacyHref} className="link" hrefLang="pt-PT">
            {labels.privacyLink}
          </a>
          .
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" className="btn-primary disabled:opacity-60" disabled={status === 'sending'}>
            {status === 'sending' ? labels.sending : labels.submit}
          </button>
        </div>

        <p ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
          {status === 'sent' && <span className="font-semibold text-estado-valido">{labels.success}</span>}
          {status === 'error' && <span className="font-semibold text-estado-erro">{labels.error}</span>}
        </p>
      </div>
    </form>
  )
}
