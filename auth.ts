import NextAuth,{ Profile} from "next-auth"
import Github from "next-auth/providers/github"
import {Author_By_Github_ID_Query} from "@/sanity/lib/queries";
import {client} from "@/sanity/lib/client";
import {writeClient} from "@/sanity/lib/write-client";

interface GithubProfile extends Profile {
    id: string,
    login:string,
    bio:string,

}


export const { handlers, signIn, signOut, auth} = NextAuth({

    providers: [Github],
    callbacks:{
        async signIn({user:{name,email,image},profile}){
            const githubprofile = profile as GithubProfile
            const existingUser = await client.withConfig({useCdn:false}).fetch(Author_By_Github_ID_Query,{id:githubprofile.id})

            if(!existingUser){
                await writeClient.create({
                    _type:'author',
                    id:githubprofile.id,
                    name:name,
                    username: githubprofile.login,
                    email:email,
                    image:image,
                    bio: githubprofile.bio||""

                })
            }
            return true
        },
        async jwt({token,account,profile}){
            if(account && profile){
                const user = await client.withConfig({useCdn:false}).fetch(Author_By_Github_ID_Query,{id:profile?.id})
                token.id = user?._id
            }
            return token
        },
        async session({session,token}){
            Object.assign(session,{id:token.id})
            return session
        }
    }
})

