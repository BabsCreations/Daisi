import Link from 'next/link';import {ArrowLeft} from 'lucide-react';
export default function NotFound(){return <section className="not-found wrap"><span>404</span><h1>This page isn’t here.</h1><p>The page may have moved or the link may be out of date.</p><Link className="button" href="/"><ArrowLeft size={16}/> Back to home</Link></section>}
