"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button"

import data from "@/data/ngsl.json"

const Ngsl = () => {
  let ngsl_list = data["ngsl"]
  let [index, setIndex] = useState(0)

  const handleNext = () => {
    setIndex(index + 1)
  }

  const handlePrev = () => {
    if (index <= 0) return
    setIndex(index - 1)
  }

  return (
    <>
      <p className="text-xl">{ngsl_list[index]["lemma"]}</p>
      <p className="text-xl">{ngsl_list[index]["japanese"]}</p>

      <Button onClick={handlePrev}>Prev</Button>
      <Button onClick={handleNext}>Next</Button>
    </>
  )
}


export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-extrabold">VocaBook</h1>
      <Ngsl />
    </main>
  )
}
