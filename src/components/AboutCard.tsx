"use client";

import React from 'react'
import { BackgroundGradient } from './ui/background-gradient';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function AboutCard({ title, content }: { title: string, content: string }) {
  return (
    <BackgroundGradient className="rounded-[22px] w-full h-full p-4 sm:p-6 bg-white dark:bg-zinc-900">
      {/* <Card className="" > */}
      <CardHeader>
        <CardTitle >{title}</CardTitle>
      </CardHeader>
      <CardContent >
        {content}
      </CardContent>
      {/* </Card> */}
    </BackgroundGradient>
  )
}
