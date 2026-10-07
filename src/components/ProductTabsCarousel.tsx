'use client';
import Image from 'next/image';
import { useRef } from 'react';
export interface ProductTab {name:string;logo:string;color:string}
export default function ProductTabsCarousel({products,selectedIndex,onSelect,ariaLabel}:{products:ProductTab[];selectedIndex:number;onSelect:(index:number)=>void;ariaLabel:string}) {
 const list=useRef<HTMLDivElement>(null);
 function select(index:number){onSelect(index);list.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus({preventScroll:true});}
 return <div ref={list} role="tablist" aria-label={ariaLabel} className="flex overflow-x-auto gap-3 py-5 px-1 scrollbar-hide lg:justify-center" onKeyDown={event=>{let next=selectedIndex;if(event.key==='ArrowRight')next=(selectedIndex+1)%products.length;else if(event.key==='ArrowLeft')next=(selectedIndex+products.length-1)%products.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=products.length-1;else return;event.preventDefault();select(next);}}>{products.map((product,index)=><button key={product.name} type="button" role="tab" id={`product-tab-${index}`} aria-selected={selectedIndex===index} aria-controls={`product-panel-${index}`} tabIndex={selectedIndex===index?0:-1} onFocus={event=>event.currentTarget.scrollIntoView({block:'nearest',inline:'nearest',behavior:'instant'})} onClick={()=>onSelect(index)} className="flex-shrink-0 bg-white rounded-xl border-2 px-5 py-4 transition-colors duration-200" style={{borderColor:selectedIndex===index?product.color:'#e2e8f0',boxShadow:selectedIndex===index?`0 4px 12px ${product.color}18`:undefined}}><Image src={product.logo} alt={product.name} width={140} height={36} className="h-7 w-auto max-w-[180px] object-contain"/></button>)}</div>;
}
