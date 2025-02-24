import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const allCatsOption = document.getElementById('show-all-cats')
const randomMeme = document.getElementById('random-meme')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

// This is one way to do it... we use the "capture" phase in order to
// not interfere with clicking the Get Image button.  There are other
// ways to do this...
document.addEventListener('click', function(e) {
  if(!e.target.closest('.meme-modal') && e.target !== getImageBtn) {
      closeModal();
  }
});

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    memeModal.style.display = 'none'
}

function renderCat(){
    const catArray = getCatArray()

    memeModalInner.innerHTML = ""

    catArray.forEach((cat) => {

      memeModalInner.innerHTML +=  `
          <img 
          class="cat-img" 
          src="./images/${cat.image}"
          alt="${cat.alt}"
          >
          `
    })

    memeModal.style.display = 'flex'
}

function getCatArray(){
    const catsArray = getMatchingCatsArray()
    const isAllCats = allCatsOption.checked
    const isRandomMeme = randomMeme.checked
    let randomNumber = 0

    if (isRandomMeme) {
      randomNumber = Math.floor(Math.random() * catsData.length)
      return [catsData[randomNumber]]
    }

    if (isAllCats) {
        return catsArray
    }

    if(catsArray.length === 1){
        return [catsArray[0]]
    }


    randomNumber = Math.floor(Math.random() * catsArray.length)
    return [catsArray[randomNumber]]
}

function getMatchingCatsArray(){     
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked

        
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




