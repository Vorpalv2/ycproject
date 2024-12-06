import React from 'react'
import SearchForm from "@/components/SearchForm";
import StartupCard, {cardInterface} from "@/components/StartupCard";

import {Startups_Query} from "@/sanity/lib/queries";
import {sanityFetch, SanityLive} from "@/sanity/lib/live";
import {auth} from "@/auth";

const Home = async({searchParams}:{searchParams:Promise<{query?: string}>}) => {
    const query = (await searchParams).query
    const params = {search:query||null}

    const {data:posts} = await sanityFetch({query:Startups_Query,params})
    // console.log(JSON.stringify(posts,null,2))
    return (
        <>
            <section className={'pink_container'}>
            <h1 className={'heading'}>Pitch Your Startup <br/> Connect with Entrepreneurs</h1>
                <p className={'sub-heading !max-w-3xl'}> Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions </p>
            <SearchForm query = {query}/>
            </section>
            <section className={'section_container'}>
                <p className={'text-30-semibold'}>
                    {query ? `Search Results for ${query}`:"All Startups"}
                </p>
                <ul className={'mt-7 card_grid'}>
                    {posts.length>0 ? (posts.map((post:cardInterface)=>(<StartupCard key={post._id} card={post}/>))) : "No Startup Found"}
                </ul>
            </section>
            <SanityLive />
        </>
    )
}
export default Home
