const api = 'AIzaSyC7iv14-M3u_pZoM6DRgsHBjC1DxVG07wM';
const output = document.querySelector('.output');
const searchTerm = document.querySelector('input');
searchTerm.setAttribute('value','test');
const btnPrev = document.createElement('button');
btnPrev.setAttribute('disabled',true);
btnPrev.textContent = 'Prev';
document.body.appendChild(btnPrev);
const btnNext = document.createElement('button');
btnNext.setAttribute('disabled',true);
btnNext.textContent = 'Next';
document.body.appendChild(btnNext);
const btns = document.querySelectorAll('button');
btns.forEach(function(btn){
    btn.addEventListener('click',ySearch);
});
function ySearch(e){
    let search = searchTerm.value;
    search = encodeURIComponent(search);
    let url = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyC7iv14-M3u_pZoM6DRgsHBjC1DxVG07wM&q='+search+'test&maxResults=20';
    //output.textContent = url;
    if(e.target.token){
        url += '&pageToken='+e.target.token;
    }
   fetch(url).then(function(rep){
        return rep.json();
    }).then(function(data){ 
        if(data.prevPageToken){
            btnPrev.token = data.prevPageToken;
            btnPrev.disabled = false;
        }else{
            btnPrev.token = data.false;
            btnPrev.disabled = true;
        }
        if(data.nextPageToken){
            btnNext.token = data.nextPageToken;
            btnNext.disabled = false;
        }else{
            btnNext.token = data.false;
            btnNext.disabled = true;
        }

    return data.items.map(function(x){
    return{
        title : x.snippet.title,
        des:x.snippet.description,
        img:x.snippet.thumbnails.default.url,
        id:x.id.videoId,
        x:x
            }
        })
    }).then(function(arr){
        show(arr);
    }).catch(function(error){
       console.log(error);
    })
}
  function show(data){
 output.innerHTML = "";
 data.forEach(function(video){
     let div = document.createElement('div');
     div.classList.add('box');
     let temp = document.createTextNode(video.des);
     let span = document.createElement('span');
     span.innerHTML = '<a href = "http://www.youtube.com/watch?v='+video.id+'"target="_blank">'+video.title+'</a>';
   div.appendChild(span);
   div.appendChild(temp);
   output.appendChild(div);
 });
}