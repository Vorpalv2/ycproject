import React from 'react'
import {cn, formatDate} from "@/lib/utils";
import {EyeIcon} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Author, Startup} from "@/sanity/types";
import {Skeleton} from "@/components/ui/skeleton";

export type cardInterface = Omit<Startup, "author"> & {author:Author}

const StartupCard = ({card}:{card:cardInterface}) => {
    return (
        <li className={'startup-card group'}>
            <div className={'flex-between'}>
                <p className={'startup-card_date'}>
                    {formatDate(card._createdAt)}
                </p>
                <div className={'flex gap-1.5'}>
                    <EyeIcon className={'size-6 text-primary'}/>
                    <span>{card.views}</span>
                </div>
            </div>
            <div className={'flex-between mt-5 gap-5'}>
                <div className={'flex-1'}>
                    <Link href={`/user/${card.author?._id}`}>
                        <p className={'text-16-medium line-clamp-1'}>{card.author?.name}</p>
                    </Link>
                    <Link href={`/startup/${card._id}`}>
                        <h3 className={'text-26-semibold line-clamp-1'}>{card.title}</h3>
                    </Link>
                </div>
                <Link href={`/user/${card.author?._id}`}>
                    <Image src={"https://placehold.co/48X48"} alt={'placeholder'} width={48} height={48} className={'rounded-full'}/>
                </Link>
            </div>
            <Link href={`/startup/${card._id}`}>
                <p className={'startup-card_desc'}>{card.description}</p>
                <img src={card.image} alt={'placeholder'} className={'startup-card_img'}/>
            </Link>
            <div className={'flex-between gap-3 mt-5'}>
                <Link href={`/?query=${card.category?.toLowerCase()}`}>
                    <p className={'text-16-medium'}>{card.category}</p>
                </Link>
                <Button className={'startup-card_btn'} asChild>
                    <Link href={`/startup/${card._id}`}>
                        Details
                    </Link>
                </Button>
            </div>
        </li>
    )
}

export const StartupCardSkeleton = () => {
    return(
        <>
            {[0,1,2,3,4].map((index)=>(
                <li key={cn('skeleton',index)}>
                    <Skeleton className={'startup-card_skeleton'}/>
                </li>
            ))}
        </>
    )
}


export default StartupCard
