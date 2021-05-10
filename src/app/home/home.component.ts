import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    empresaId = "57b800c9-60b0-4b12-91de-57c4886f0165";
    numbers = []
    vagas = [];
    posts = [];
    swiper = null
    carregandoVagas = true;
    carregandoPosts = true;
    breakpoints = {
        576: {
            slidesPerView: 1,
            spaceBetween: 35
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 35
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 35
        }
    };

    constructor() {
        this.numbers = Array(10).fill('').map((x,i)=>i); // [0,1,2,3,4]

        this.getVagas().then((response) => {
            this.carregandoVagas = false;
            this.vagas = response;
        })
        this.getPosts().then((response) => {
            this.carregandoPosts = false;
            this.posts = response;
        })
    }

    ngOnInit(): void {

    }

    async getVagas () {
        const response = await axios({
            method: 'get',
            url: 'https://www.reachr.com.br/api/VagaParts/GetVagasEmpresa/' + this.empresaId,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty'
            }
        })

        if (!response || response.status !== 200 || !response.data) return []

            const fetchedVagas = []

        for (const item of response.data) {
            if (this.isVagaFromEmpresaId(item) && this.isVagaValid(item) && this.isVagaExterna(item)) {
                fetchedVagas.push(item)
            }
        }

        return fetchedVagas
    }

    isVagaFromEmpresaId (vaga) {
        return vaga.EmpresaId === this.empresaId;
    }

    isVagaValid (vaga) {
        return vaga.Part && vaga.Part.nome;
    }

    isVagaExterna (vaga) {
        return (vaga.Part.tipoVaga === 0 || vaga.Part.tipoVaga === 2);
    }

    async getPosts () {
        const response = await axios({
            method: 'get',
            url: 'https://www.reachr.com.br/blog/wp-json/wp/v2/posts?_embed&per_page=3&categories=354',
            headers: {
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Accept': 'application/json, text/plain, */*',
                'Sec-Fetch-Dest': 'empty'
            }
        });

        if (!response || response.status !== 200 || !response.data) return [];

        return response.data;
    }

    abrirVaga(vaga) {
        if (vaga.url) {
            window.open(vaga.url, '_blank');
        } else {
            window.open(
                "https://www.reachr.com.br/#/Vaga/" + vaga.id,
                '_blank'
                );
        }
    }

    abrirPost(post) {
        if (post.link) {
            window.open(post.link, '_blank');
        } else {
            window.open(
                "https://www.reachr.com.br/blog/",
                '_blank'
                );
        }
    }

    onSwiper(swiper) {
        this.swiper = swiper;
        console.log(swiper.isBeginning)
    }

    nextSlide () {
        if (this.swiper) this.swiper.slideNext();
    }

    previousSlide () {
        if (this.swiper) this.swiper.slidePrev();
    }
}
