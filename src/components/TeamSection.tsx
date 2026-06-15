'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import MaxWidthWrapper from './MaxWidthWrapper'
import { useLanguage } from '@/contexts/LanguageContext'

const TEAM = [
  {
    name: 'Alexandre Barreto',
    image: '/images/team/geteasier-1.jpeg',
    roleKey: 'team.roles.development',
  },
  {
    name: 'Nelson Luís',
    image: '/images/team/geteasier-2.jpeg',
    roleKey: 'team.roles.development',
  },
  {
    name: 'Rui Peixoto',
    image: '/images/team/geteasier-3.jpeg',
    roleKey: 'team.roles.productManager',
  },
]

export default function TeamSection() {
  const { t } = useLanguage()
  const reduceMotion = useReducedMotion()

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const card = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 40, scale: reduceMotion ? 1 : 0.96 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 90, damping: 16, mass: 0.6 },
    },
  }

  return (
    <section
      className="w-full flex flex-col justify-center relative items-center py-16 md:py-20 px-4 md:px-8"
      id="team"
    >
      <div className="w-[100vw] h-[100%] bg-[#003566] absolute top-0 transform -z-1 -skew-y-3" />

      <div className="text-center relative z-10">
        <h3 className="text-3xl md:text-5xl text-white font-bold mb-3 tracking-tight">
          {t('team.title')}
        </h3>
        <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto">
          {t('team.subtitle')}
        </p>
      </div>

      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 py-8 md:py-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {TEAM.map((member) => (
          <motion.div
            key={member.name}
            variants={card}
            className="flex justify-center items-stretch"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: 'spring', stiffness: 250, damping: 18 }}
              className="group relative w-full max-w-xs mx-auto aspect-[3/4] rounded-2xl overflow-hidden shadow-lg ring-1 ring-white/10 lg:hover:shadow-2xl lg:hover:ring-white/20"
            >
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 280px"
                  className="object-cover object-center transition-transform duration-500 ease-out lg:group-hover:scale-105"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                <p className="text-lg md:text-xl font-bold drop-shadow-sm">
                  {member.name}
                </p>
                <p className="text-sm text-white/90">{t(member.roleKey)}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
