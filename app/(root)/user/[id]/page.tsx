import React, {Suspense} from 'react'
import {auth} from "@/auth";
import {client} from "@/sanity/lib/client";
import {Author_By_ID_Query} from "@/sanity/lib/queries";
import {notFound} from "next/navigation";
import Image from "next/image"
import UserStartups from "@/components/UserStartups";
import {StartupCardSkeleton} from "@/components/StartupCard";

export const experimental_ppr = true

const Page = async({params}:{params:Promise<{id:string}>}) => {
    const id = (await params).id
    const session = await auth()

    const user = await client.fetch(Author_By_ID_Query,{id})

    if(!user) return notFound()

    return (
        <>
            <section className={'profile_container'}>
                <div className={'profile_card'}>
                    <div className={'profile_title'}>
                        <h3 className={'text-24-black uppercase text-center line-clamp-1'}>
                            {user.name}
                        </h3>
                    </div>
                    <Image
                        src={user.image}
                        alt={user.name}
                        width={220}
                        height={220}
                        className={'profile_image'}
                    />
                    <p className={'text-30-extrabold text-center mt-7'}>@{user?.username}</p>
                    <p className={'mt-1 text-center text-14-normal'}>{user?.bio}</p>

                </div>
                <div className={'flex-1 flex flex-col gap-5 lg:mt-5'}>
                    <p className={'text-30-bold'}>
                        {session!.id === id ? "Your Startups" : "All Startups"}
                    </p>
                </div>
                <ul className={'card_grid-sm'}></ul>
                <Suspense fallback={<StartupCardSkeleton/>}>
                        <UserStartups id={id} />
                    </Suspense>
            </section>
        </>
    )
}
export default Page
