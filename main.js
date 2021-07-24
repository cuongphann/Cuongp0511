const $ = document.querySelector.bind(document);
const $$ = document.querySelector.bind(document);
const PLAYER_STORAGE_KEY = 'Skyer-Player'

const playlist = $('.playlist');
const heading = $('.header-title');
const cdThumb = $('.header-img');
const audio = $('#audio');
const playBtn = $('#play')
const icon = $('.iconplay')
const proress = $('#slider')
const proressbar = $('#proressbar')
const nextBtn = $('#next')
const prevBtn = $('#prev')
const randomBtn = $('#random')
const repeatBtn = $('#repeat')
const timestart = $('#timestart');
const timeend = $('#timeend');


const app = {
    isPlaying:false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY )) || {},
    
    songs: [
        {
            name: 'Hạ Còn Vương Nắng',
            singer: 'Datkaa',
            path: './assets/songs/haconvuongnang.mp3',
            image: './assets/img/haconvuongnang.jpg'
        },
        {
            name: 'Cô Đơn Giành Cho Ai',
            singer: 'Lee Ken Nal',
            path: './assets/songs/codongianhchoai.mp3',
            image: './assets/img/codongianhchoai.jpg'
        },
        {
            name: 'Đường Tôi Chở Em Về (1 9 6 7 Remix)',
            singer: 'buitruonglinh',
            path: './assets/songs/duongtoichoemve.mp3',
            image: './assets/img/duongtoichoemve.jpg'
        },
        {
            name: 'Than Thân',
            singer: 'G5R Squad',
            path: './assets/songs/thanthan.mp3',
            image: './assets/img/thanthan.jpg'
        },
        {
            name: 'Chiều thu hoạ bóng nàng QTBeatz remix',
            singer: 'Datkaa',
            path: './assets/songs/chieuthuhoabongnang.mp3',
            image: './assets/img/chieuthuhoabongnang.jpg'
        },
        {
            name: 'Move Your Body',
            singer: 'Sia; Alan Walker',
            path: './assets/songs/moveyourbody.mp3',
            image: './assets/img/moveyourbody.jpg'
        },
        {
            name: 'Unstoppable',
            singer: 'Sia',
            path: './assets/songs/unstoppable.mp3',
            image: './assets/img/moveyourbody.jpg'
        },
        {
            name: 'Sóng Gió (EDM Hay Nhất)',
            singer: 'Jack - KICM | Trọng RMX MIX',
            path: './assets/songs/songgio.mp3',
            image: './assets/img/songgio.jpg'                        
        },
        {
            name: 'Thương Thầm (Lofi Version)',
            singer: 'NB3 Hoài Bảo; Freak D',
            path: './assets/songs/thuongtham.mp3',
            image: './assets/img/thuongtham.jpg'
        },
        {
            name: 'Em Đi Trên Cỏ Non (lofi ver)',
            singer: 'NB3 HOÀI BẢO x FREAK D COVER',
            path: './assets/songs/emditrenconon.mp3',
            image: './assets/img/emditrenconon.jpg'
        },
        {
            name: 'Chỉ Là Không Cùng Nhau (Lofi Version)',
            singer: 'Tăng Phúc; Trương Thảo Nhi; Freak D',
            path: './assets/songs/chilakhongcungnhau.mp3',
            image: './assets/img/chilakhongcungnhau.jpg'
        },
        {
            name: '3 1 0 7 - 2 (Remix)',
            singer: 'Orinn; DuongG; Nâu; W/n',
            path: './assets/songs/3107.mp3',
            image: './assets/img/3107.jpg'
        },
        {
            name: 'Cố Giang Tình',
            singer: 'Orinn; Phát Hồ; JokeS Bii; DinhLong',
            path: './assets/songs/cogiangtinh.mp3',
            image: './assets/img/cogiangtinh.jpg'
        },
        {
            name: 'Họa Mây',
            singer: 'X2X',
            path: './assets/songs/hoamay.mp3',
            image: './assets/img/hoamay.jpg'
        },
        {
            name: 'Sài Gòn Đau Lòng Quá',
            singer: 'Hứa Kim Tuyền; Hoàng Duyên',
            path: './assets/songs/saigondaulongqua.mp3',
            image: './assets/img/saigondaulongqua.jpg'
        },

    ],
    setConfig: function(key,value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        var htmls = this.songs.map(function(song,index) {
            return `
            <div class="songs ${index === app.currentIndex ? 'invalid' : ''}" data-index=${index}>
                <div class="song-img" style="background-image: url('${song.image}')"></div>
                <div class="song-desc">
                    <h3 class="song-name">${song.name}</h3>
                    <p class="song-singer">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h song-icon"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defindProperties:function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    currentIndex: Math.floor(Math.random() * 15),
    handleEvent: function() {
        const _this = this
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], 
        {
            duration: 10000,
            iterations: Infinity,
        })
        cdThumbAnimate.pause();
        // xử lý khi click play
        playBtn.onclick = function() {
            if(_this.isPlaying == true) {
                audio.pause();
                
            } else {
                audio.play();
                
            }
            
        }
        // xử lý cd quay và dừng
        
        // khi bài hát được chạy 
        audio.onplay = function() {
            _this.isPlaying = true; 
            icon.classList = 'fas fa-pause'
            cdThumbAnimate.play();
            
        }
        // khi tắt bài hát
        audio.onpause = function() {
            _this.isPlaying = false;
            icon.classList = 'fas fa-play'
            cdThumbAnimate.pause();
        
        }
        
        
        // khi tiến độ bài hát thay đổi 
        audio.ontimeupdate = function(e) {
            const currentTime = e.target.currentTime;
            
            if(audio.duration) {
                const proressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                proress.value = proressPercent;
                proressbar.style.width = proressPercent + '%';
            }
            // update time 
            audio.addEventListener('loadeddata', function(e) {
                const audioDuration = audio.duration;
                const totalMin = Math.floor(audioDuration / 60)
                const totalSec = Math.floor(audioDuration % 60)
                timeend.innerText = `${totalMin < 10 ? '0' + totalMin : totalMin}:${totalSec < 10 ? '0' + totalSec : totalSec}`;
                
            })
            const currentMin = Math.floor(currentTime / 60)
            const currentSec = Math.floor(currentTime % 60)
            timestart.innerText = `${currentMin < 10 ? '0' + currentMin : currentMin}:${currentSec < 10 ? '0' + currentSec : currentSec}`;
        }

        // xử lý khi tua bài hát 
        proress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime;
        }
        // next 
        nextBtn.onclick = function(){
            if(_this.isRandom) { 
                _this.playRandomSong();
            } else {
                _this.nextSong();

            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // prev
        prevBtn.onclick = function(){
            if(_this.isRandom) {
                _this.playRandomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Xử lý random bật tắt
        randomBtn.onclick = function(e) {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom',_this.isRandom)
            this.classList.toggle('active',_this.isRandom)
        }

        // Xử lý phát lại 1 bài hát
        repeatBtn.onclick = function(e) {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            this.classList.toggle('active',_this.isRepeat)
        }

        // Xử lý next khi bài hát kết thúc 
        audio.onended = function () {
            if(_this.isRepeat) {
                this.play();
            } else {
                nextBtn.click();
            }
        }
        // lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.songs:not(.invalid)')
            // xử lý khi click vào bài hát
            if(songNode || e.target.closest('.option')) {
                // xử lý khi click vào bài hát
                if(songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();
                }
                // xử lý khi click vào tùy chọn
                if(e.target.closest('.option')) {

                }
                
            }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    prevSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        }while(newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.songs.invalid').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        },500)
    },
    start: function() {

        // định nghĩa các thuộc tính cho object
        this.defindProperties()
        
        // lắng nghe và sử lý các sự kiện
        this.handleEvent();
        
        // tải thông tin bài hát đầu tiên vào ui khi chạy ứng dụng
        this.loadCurrentSong();

        // render playlist
        this.render();
    }
}
app.start()


