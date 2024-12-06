
import React from 'react'
import Form from "next/form";
import SearchFormReset from "@/components/SearchFormReset";
import {Search} from "lucide-react";
import {Button} from "@/components/ui/button";

const SearchForm = ({query}:{query?:string}) => {

    return (
       <Form action={"/"} scroll={false} className={'search-form'}>
           <input name={"query"} className={"search-input"} defaultValue={""} type={"text"} placeholder={"Search startups"}></input>
           {query && <SearchFormReset/>}
           <Button variant={"outline"}  className={"search-btn text-white"} type={'submit'}>
               <Search/>
           </Button>
       </Form>
    )
}
export default SearchForm
