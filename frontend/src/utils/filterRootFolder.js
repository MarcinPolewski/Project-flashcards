const filterRootFolder = (folders) => {
    if (!folders || folders.length === 0) return [];
    return folders.filter((folder) => folder.name !== "ROOT");
}

export default filterRootFolder;