'use client'

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  
  const back = () => {
    router.back();
  }
  return (
    <button onClick={back}>←</button>
  )
}