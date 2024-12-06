import {unstable_after as after} from "next/server";
import React from 'react'
import Ping from "@/components/ping";
import {client} from "@/sanity/lib/client";
import {Startup_Query_For_Views} from "@/sanity/lib/queries";
import {writeClient} from "@/sanity/lib/write-client";

const View = async({id}:{id:string}) => {

    const {views:totalViews} = await client.withConfig({useCdn:false}).fetch(Startup_Query_For_Views,{id})

    after(async()=>await writeClient
        .patch(id)
        .set({views:totalViews+1})
        .commit())

    return (
       <div className={'view-container'}>
           <div className={'absolute -top-2 -right-2'}>
               <Ping/>
           </div>
           <p className={'view-text'}>
               <span className={'font-black'}>Views:{totalViews}</span>
           </p>
       </div>
    )
}
export default View
