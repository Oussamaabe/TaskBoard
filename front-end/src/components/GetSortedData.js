import React from 'react'

export default function GetSortedData(allData , sortByDate) {

    if(allData !== 'load'){

        if(sortByDate){
            allData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        }

        return allData
    }
}
