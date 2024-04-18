document.getElementById('fileInput').addEventListener('change', handleFileSelection);
document.getElementById('folderInput').addEventListener('change', handleFolderSelection);

function handleFileSelection(event) {
    const files = event.target.files;
    displaySelectedFiles(files);
}

function handleFolderSelection(event) {
    const folders = event.target.files;
    displaySelectedFiles(folders);
}

function displaySelectedFiles(files) {
    const selectedFilesDiv = document.getElementById('selectedFiles');
    selectedFilesDiv.innerHTML = ''; // Clear previous selection

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileItem = document.createElement('div');
        fileItem.textContent = file.webkitRelativePath || file.name; // Show relative path for folders
        selectedFilesDiv.appendChild(fileItem);
    }
}

document.getElementById('convertButton').addEventListener('click', convertFile);

function convertFile() {
    const files = document.getElementById('fileInput').files;
    const folders = document.getElementById('folderInput').files;
    var zip=new JSZip();

    if (files.length === 0 /*&& folders.length === 0*/) {
        alert('Please select file(s) or folder.');
        return;
    }
    for(var i=0; i<files.length;i++)
    {
        var file=files[i]
        zip.file(file.name,file);
    }
    zip.generateAsync({type:'blob'})
    .then(function(content)
    {
        saveAs(content,"files.zip")
    })
    console.log('Files selected for conversion:', files);
    console.log('Folders selected for conversion:', folders);
    return;
}
