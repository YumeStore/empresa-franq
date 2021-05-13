import { Component, OnInit, ViewEncapsulation, } from "@angular/core";
import SwiperCore, { Navigation, Pagination, Thumbs } from "swiper/core";
import { SwiperComponent } from "swiper/angular";

import axios from "axios";

SwiperCore.use([Navigation, Thumbs]);
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  empresaId = "57b800c9-60b0-4b12-91de-57c4886f0165";
  numbers = [];
  thumbsSwiper: any;
  vagas = [];
  posts = [];
  slides = [0, 1, 2];
  slideAtual = 0;
  slideAtualmd = 0;
  swiper = null;
  carregandoVagas = true;
  carregandoPosts = true;
  breakpoints = {
    576: {
      slidesPerView: 1,
      spaceBetween: 35,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 35,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 35,
    },
  };

  constructor() {
    this.numbers = Array(10)
      .fill("")
      .map((x, i) => i); // [0,1,2,3,4]

    this.getVagas().then((response) => {
      this.carregandoVagas = false;
      this.vagas = response;
    });
    this.getPosts().then((response) => {
      this.carregandoPosts = false;
      this.posts = response;
    });
  }

  ngOnInit(): void {
    this.slideAtual = 0;
    this.slideAtualmd = 0;
  }

  async getVagas() {
    const response = await axios({
      method: "get",
      url:
        "https://www.reachr.com.br/api/VagaParts/GetVagasEmpresa/" +
        this.empresaId,
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Dest": "empty",
      },
    });

    if (!response || response.status !== 200 || !response.data) return [];

    const fetchedVagas = [];

    for (const item of response.data) {
      if (
        this.isVagaFromEmpresaId(item) &&
        this.isVagaValid(item) &&
        this.isVagaExterna(item)
      ) {
        fetchedVagas.push(item);
      }
    }

    return fetchedVagas;
  }

  nextSlideDepoimento() {
    for (let i = 0; i < this.slides.length - 1; i++) {
      if (i == this.slideAtual) {
        this.slideAtual += 1;
        this.slideControlShow(this.slideAtual);
        this.slideControlAdd(this.slideAtual - 1);
        this.efeitoFadeIn(this.slideAtual);
        return;
      }
    }

    this.slideAtual = this.slides[0];
    this.slideControlShow(this.slideAtual);
    this.slideControlAdd(this.slides.length);
  }

  prevSlideDepoimento() {
    for (let i = 0; i < this.slides.length; i++) {
      if (i == this.slideAtual) {
        this.slideAtual -= 1;
        this.slideControlShow(this.slideAtual);
        this.slideControlAdd(this.slideAtual + 1);
        this.efeitoFadeIn(this.slideAtual);
        return;
      }
    }
  }

  slideControlShow(slideAtual: number) {
    var slide = document.getElementById(`slide${slideAtual}`);
    slide.classList.remove("d-none");
  }

  slideControlAdd(slideAtual: number) {
    var slide = document.getElementById(`slide${slideAtual}`);
    slide.classList.add("d-none");
  }

  efeitoFadeIn(slideAtual: number){
    var slide = document.getElementById(`slide${slideAtual}`);
    slide.animate([{ opacity: '0' },
                   { opacity: '1' }], 2000);
  }

  nextSlideDepoimentoMd() {
    for (let i = 0; i < this.slides.length - 1; i++) {
      if (i == this.slideAtualmd) {
        this.slideAtualmd += 1;
        this.slideControlShowMd(this.slideAtualmd);
        this.slideControlAddMd(this.slideAtualmd - 1);
        this.efeitoFadeInMd(this.slideAtualmd);
        return;
      }
    }

    this.slideAtualmd = this.slides[0];
    this.slideControlShowMd(this.slideAtualmd);
    this.slideControlAddMd(this.slides.length);
  }

  prevSlideDepoimentoMd() {
    for (let i = 0; i < this.slides.length; i++) {
      if (i == this.slideAtualmd) {
        this.slideAtualmd -= 1;
        this.slideControlShowMd(this.slideAtualmd);
        this.slideControlAddMd(this.slideAtualmd + 1);
        this.efeitoFadeInMd(this.slideAtualmd);
        return;
      }
    }
  }

  slideControlShowMd(slideAtual: number) {
    var slide = document.getElementById(`slideMd${slideAtual}`);
    slide.classList.remove("d-none");
  }

  slideControlAddMd(slideAtual: number) {
    var slide = document.getElementById(`slideMd${slideAtual}`);
    slide.classList.add("d-none");
  }

  efeitoFadeInMd(slideAtual: number){
    var slide = document.getElementById(`slideMd${slideAtual}`);
    slide.animate([{ opacity: '0' },
                   { opacity: '1' }], 2000);
  }
  
  isVagaFromEmpresaId(vaga) {
    return vaga.EmpresaId === this.empresaId;
  }

  isVagaValid(vaga) {
    return vaga.Part && vaga.Part.nome;
  }

  isVagaExterna(vaga) {
    return vaga.Part.tipoVaga === 0 || vaga.Part.tipoVaga === 2;
  }

  async getPosts() {
    const response = await axios({
      method: "get",
      url: "https://www.reachr.com.br/blog/wp-json/wp/v2/posts?_embed&per_page=3&categories=354",
      headers: {
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        Accept: "application/json, text/plain, */*",
        "Sec-Fetch-Dest": "empty",
      },
    });

    if (!response || response.status !== 200 || !response.data) return [];

    return response.data;
  }

  abrirVaga(vaga) {
    if (vaga.url) {
      window.open(vaga.url, "_blank");
    } else {
      window.open("https://www.reachr.com.br/#/Vaga/" + vaga.id, "_blank");
    }
  }

  abrirPost(post) {
    if (post.link) {
      window.open(post.link, "_blank");
    } else {
      window.open("https://www.reachr.com.br/blog/", "_blank");
    }
  }

  onSwiper(swiper) {
    this.swiper = swiper;
    console.log(swiper.isBeginning);
  }

  nextSlide() {
    if (this.swiper) this.swiper.slideNext();
  }

  previousSlide() {
    if (this.swiper) this.swiper.slidePrev();
  }
}
