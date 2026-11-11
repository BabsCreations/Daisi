"use client";

import Link from 'next/link';
import {Menu} from 'lucide-react';
import type {ReactNode} from 'react';

export function MobileNav({children}:{children:ReactNode}) {
  return <details className="mobile-nav"><summary aria-label="Open navigation"><Menu/></summary><div onClick={(event)=>{if(event.target instanceof Element&&event.target.closest('a'))event.currentTarget.parentElement?.removeAttribute('open')}}><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/portfolio">Portfolio</Link><Link href="/insights">Insights</Link><Link href="/contact">Contact</Link>{children}</div></details>;
}
