import React from 'react'

const Filter = ({name, searchFn}) =>{
    return (
        <form>
            <div>
                search: <input value={name} onChange={searchFn} />
            </div>
        </form>
    )
}

export default Filter