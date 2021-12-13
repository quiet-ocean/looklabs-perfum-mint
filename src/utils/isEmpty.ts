let isEmpty = (item: any) => {
    if(item === undefined || item === '' || item === {} || item === [])
        return false
    return true
}

export { isEmpty }