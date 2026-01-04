"use client";

import { Link } from 'react-scroll'

export default function ContactUsCta() {
  return (
    <Link to="contact" spy={true} smooth={true} offset={50}>
      Comece Hoje
    </Link>
  )
}
