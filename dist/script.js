let form = document.querySelector('#check')
let baseDiv = document.getElementById('baseDiv');
let childDiv = document.getElementById('childDiv')

form.addEventListener('click', function (e) {
    const userName = document.querySelector('#username_in').value;
    fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(obj =>{
            console.log(obj.name);
            console.log(`Number of followers of ${obj.name} is ${obj.followers}`);
            console.log(obj.bio);
            childDiv.remove();
            let nbaseDiv = document.createElement('div');
            nbaseDiv.className = 'bg-white p-4 items-center rounded-md w-4/6 md:w-1/2 mt-5 mb-5 flex flex-col justify-center';
            nbaseDiv.innerHTML = `
            <div class="flex justify-center items-center" id="moreBase">
                <img src="${obj.avatar_url}" class="w-32 md:w-48 p-2" self-center></div>
                <p class="text-2xl md:text-3xl font-bold font-sans text-center">${obj.name}</p>
                <p class="text-sm md:text-xl font-semibold font-sans text-center">${obj.bio}</p>
                <p class="text-sm md:text-xl font-semibold font-sans text-center"><span class="font-bold">Followers : </span>${obj.followers} <span class="font-bold"> Following : </span>${obj.following}</p>
            `
            baseDiv.append(nbaseDiv);
            fetch(`${obj.organizations_url}`)
                .then(response => response.json())
                .then(objRepo =>{
                    if(objRepo.length >= 1){
                        let repoDiv = document.createElement('div');
                        repoDiv.className = "flex flex-col justify-center text-center"
                        repoDiv.innerHTML = `<p1 class="text-xl md:text-2xl font-bold font-sans text-center">Organizations<br></p1>`
                        nbaseDiv.append(repoDiv)
                        let orgImg = document.createElement('div');
                        orgImg.className = "items-center place-items-center flex flex-wrap justify-center"
                        objRepo.forEach(element => {
                            let repoImgDiv = document.createElement('div');
                            repoImgDiv.className = "items-center place-items-center flex flex-wrap justify-center"
                            repoImgDiv.innerHTML = `
                            <div class="group bg-white m-2 p-1 items-center rounded-2xl myscale">
                            <div class="flex justify-center">
                            <img class="w-12 md:w-16 rounded-xl" src="${element.avatar_url}" alt="">
                            </div>
                            <div class="flex justify-center">
                            <h1 class="text-center text-blue-500 font-bold text-sm md:text-lg font-sans">${element.login}</h1>
                            </div>
                            </div>`
                            orgImg.append(repoImgDiv)
                        })
                        nbaseDiv.append(orgImg)
                    }
                })
                .catch(error => console.error('Error in More:', error));
            let buttDiv = document.createElement('div');
            buttDiv.className = "flex justify-center"
            buttDiv.innerHTML = `<button id="more_detail" class="bg-blue-500 rounded-sm p-1 mt-2 mb-2 font-semibold text-sm text-center text-white">
                More
            </button>`
            nbaseDiv.append(buttDiv)
            let moreButton = document.querySelector('#more_detail');
            moreButton.addEventListener('click', function(e) {
                fetch(`${obj.repos_url}`)
                    .then(response => response.json())
                    .then(objBase => {
                        baseDiv.className = "flex items-center justify-center mt-4 mb-4"
                        moreButton.remove();
                        let x = 1;
                        let morebaseDiv = document.createElement('div');
                        morebaseDiv.className = "flex justify-center"
                        morebaseDiv.innerHTML = `<p1 class="text-xl md:text-2xl font-bold font-sans text-center">Repositories</p1>`
                        nbaseDiv.append(morebaseDiv)
                        objBase.forEach(element => {
                            let morebaseDiv = document.createElement('div');
                            let createdOn = element.created_at
                            let createdTxt = createdOn.slice(0, 10);
                            morebaseDiv.innerHTML = `<p1 class="text-sm md:text-xl font-semibold font-sans text-center ml-4 mr-4">${x}. ${element.name}<span class="md:hidden"><br></span> <span class="font-normal">[Created on: ${createdTxt}]</span></p1>`
                            nbaseDiv.append(morebaseDiv)
                            x++;
                        });
                        let reloadDiv = document.createElement('div');
                        reloadDiv.innerHTML = `<button onClick="history.go(0);" id="check" class="bg-blue-500 rounded-sm p-1 mt-2 mb-2 font-semibold text-sm text-center text-white">
                        New
                    </button>`
                    nbaseDiv.append(reloadDiv)
                    })
                    .catch(error => console.error('Error in More:', error));
            })

        })
        .catch(error => console.error('Error:', error));
  });
