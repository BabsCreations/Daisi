import type {Metadata} from 'next';
import './globals.css';
import {Shell} from '@/components/Site';
const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export const metadata:Metadata={metadataBase:new URL(base),alternates:{canonical:'/'},title:{default:'Daisi | Notion Project Management & Business Systems',template:'%s | Daisi'},description:'Daisi helps founders, consultants, agencies and growing businesses organize projects, manage clients and streamline operations with practical Notion systems.',openGraph:{type:'website',siteName:'Daisi',title:'Daisi | Notion Systems Consultant',description:'Practical systems for clearer projects and more organized business operations.'},robots:{index:true,follow:true}};
const websiteData={'@context':'https://schema.org','@type':'WebSite',name:'Daisi',description:'Notion project management and business systems consulting.',url:base};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteData).replace(/</g,'\\u003c')}}/></body></html>}
