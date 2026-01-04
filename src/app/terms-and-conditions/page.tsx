import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

const TermsAndConditions = () => {
  return (
    <MaxWidthWrapper className='text-center flex flex-col gap-12'>
      <h1 className='text-4xl'>
        Termos e condições
      </h1>
      <h2 className='text-3xl'>
        Termos de Uso:
      </h2>
      <p>
        Bem-vindo ao website da GetEasier. Ao acessar este website, você concorda em cumprir estes termos de uso, nossa política de privacidade e todas as leis e regulamentos aplicáveis. Se você não concordar com algum destes termos, por favor, não use este website.

        O conteúdo deste website é protegido por leis de direitos autorais e propriedade intelectual. Qualquer uso não autorizado do conteúdo deste website pode violar leis de direitos autorais, leis de marcas comerciais e outras leis aplicáveis.

        Reservamo-nos o direito de atualizar ou modificar estes termos de uso a qualquer momento, sem aviso prévio. Ao continuar a usar este website após tais alterações, você aceita os termos atualizados.
      </p>
      <h2 className='text-3xl'>
        Política de Privacidade:
      </h2>
      <p>
        A privacidade dos nossos visitantes é extremamente importante para nós. Esta política de privacidade descreve os tipos de informações pessoais que coletamos e como as utilizamos.

        Coletamos informações pessoais fornecidas voluntariamente pelos visitantes, como nome, endereço de e-mail e número de telefone, apenas para fins de comunicação e prestação de serviços. Não compartilhamos suas informações pessoais com terceiros sem o seu consentimento.

        Utilizamos cookies e tecnologias semelhantes para melhorar a experiência do usuário e analisar o tráfego do website. Ao continuar a utilizar este website, você concorda com o uso de cookies de acordo com a nossa política de cookies.
      </p>
    </MaxWidthWrapper>
  )
}

export default TermsAndConditions