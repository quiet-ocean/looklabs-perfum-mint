let isEmpty = (item: any) => {
    if(item === undefined || item === '' || item === {} || item === [])
        return true
    return false
}

export { isEmpty }