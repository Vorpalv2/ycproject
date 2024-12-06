import React from 'react'
import {client} from "@/sanity/lib/client";
import {Startups_By_Author as STARTUPS_BY_AUTHOR_QUERY} from "@/sanity/lib/queries";
import StartupCard, {cardInterface as StartupTypeCard} from "@/components/StartupCard";

const UserStartups = async ({ id }: { id: string }) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup: StartupTypeCard) => (
                    <StartupCard key={startup._id} card={startup} />
                ))
            ) : (
                <p className="no-result">No posts yet</p>
            )}
        </>
    );
};
export default UserStartups;
