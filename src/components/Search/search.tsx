import { Input } from "@/components/ui/input"



function Search(){
    return(
        <div className = "flex flex-col p-4 ">
            <div className = "pb-4">
                <h1 className = "text-4xl bold ">Search</h1>
            </div>
            <Input type="search" placeholder="Search for items, brands, or other keywords" />

        </div>
    )
}


export default Search;
