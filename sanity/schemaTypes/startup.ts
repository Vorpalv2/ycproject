import {defineField, defineType} from "sanity";


export const startup = defineType({
    name:"startup",
    title:"Startup",
    type:"document",
    fields:[
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:"title"
            }
        }),
        defineField({
            name:"title",
            type:"string",
        }),
        defineField({
            name:"author",
            type:"reference",
            to:{type:"author"}
        }),
        defineField({
            name:"views",
            type:"number",
        }),
        defineField({
            name:"category",
            type:"string",
            validation: (rule)=>rule.min(1).max(10).required().error("Please Enter a Category"),
        }),
        defineField({
           name:"description",
           type:"string"
        }),
        defineField({
            name:"image",
            type:"url",
            validation:(rule)=>rule.required()
        }),
        defineField({
            name:"pitch",
            type:"markdown"
        })
    ],
})