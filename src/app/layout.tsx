import type {Metadata} from 'next';
import './globals.css';
import {Shell} from '@/components/Site';
import {siteUrl} from '@/lib/site';
export const metadata:Metadata={metadataBase:new URL(siteUrl),alternates:{canonical:'/'},title:{default:'Daisi | Notion Project Management & Business Systems',template:'%s | Daisi'},description:'Daisi helps founders, consultants, agencies and growing businesses organize projects, manage clients and streamline operations with practical Notion systems.',openGraph:{type:'website',siteName:'Daisi',title:'Daisi | Notion Systems Consultant',description:'Practical systems for clearer projects and more organized business operations.'},robots:{index:true,follow:true}};
const websiteData={'@context':'https://schema.org','@type':'WebSite',name:'Daisi',description:'Notion project management and business systems consulting.',url:siteUrl};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteData).replace(/</g,'\\u003c')}}/></body></html>}
