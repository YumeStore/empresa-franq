import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-vagas',
	templateUrl: './vagas.component.html',
	styleUrls: ['./vagas.component.css']
})
export class VagasComponent implements OnInit {
	empresaId = "67807b00-32f4-4ea6-8fed-231a43e93b7f";
	area = 'p';
	nivel = 'p';
	cidade = 'p';
	vagas = [];
	vagasFiltro = [];
	vagasInternas=[];
	niveis = [];
	areas = [];
	cidades = [];
	filtroPalavra = "";
	palavra;
	carregando = true;

	constructor(private http: HttpClient, public actRouter: ActivatedRoute) {
		this.getVagas();
	}

	ngOnInit() {}


	abrirVaga(vaga) {
		if (vaga.url) {
			window.open(vaga.url, '_blank');
		} else {
			window.open("https://www.reachr.com.br/#/Vaga/" + vaga.id, '_blank');
		}
	}

	getVagas(){
		let array;
		let headers = new HttpHeaders()
		.set('Content-Type', 'application/json')
		//Request
		let url;
		url = 'https://www.reachr.com.br/api/VagaParts/GetVagasEmpresa/' + this.empresaId;

		this.http.get(url, { headers: headers }).subscribe(data => {
			array = data;
			let i = 0;
			//console.log(array);
			//***** VAGAS INTERNAS = array[i].Part.tipoVaga === 1
			//***** VAGAS EXTERNAS = array[i].Part.tipoVaga === 0
			let tipo = 0;

			//console.log('tipo de vaga', tipo)
			for (i; i<array.length; i++){
				if (array[i].EmpresaId === this.empresaId && array[i].Part.nome && array[i].Part.tipoVaga === tipo) {
					this.vagas.push(array[i]);
					this.vagasFiltro.push(array[i]);

					if(array[i].Part.areaAtuacao){
						let obj = {area: array[i].Part.areaResponsavelNew};
						this.areas.push(obj);
					}
					if(array[i].Part.nivel){
						let obj2 = {nivel: array[i].Part.nivel.Descricao};
						this.niveis.push(obj2);
					}
					if(array[i].Part.cidade){
						let obj3 = {cidade: array[i].Part.cidade.Cidade};
						this.cidades.push(obj3);
					}
				}
			}

			this.carregando = false;
			this.filtrarAreas();
			this.filtrarNiveis();
			this.filtrarCidades();
		})
	}

	filtrarAreas(){
		let array = [];
		array = this.areas.filter((value, index, array) =>
			!array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
		this.areas = [];
		this.areas = array;
	}

	filtrarNiveis(){
		let array = [];
		array = this.niveis.filter((value, index, array) =>
			!array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
		this.niveis = [];
		this.niveis = array;
	}

	filtrarCidades(){
		let array = [];
		array = this.cidades.filter((value, index, array) =>
			!array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
		this.cidades = [];
		this.cidades = array;
	}

	filtro(){
		if((this.area != 'p') && (this.nivel != 'p') && (this.cidade != 'p')){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.nivel.Descricao === this.nivel) && (this.vagasFiltro[i].Part.areaResponsavelNew === this.area) && (this.vagasFiltro[i].Part.cidade.Cidade === this.cidade)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else if((this.area != 'p') && (this.nivel != 'p')){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.areaResponsavelNew === this.area) && (this.vagasFiltro[i].Part.nivel.Descricao === this.nivel)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else if((this.nivel != 'p') && (this.cidade != 'p')){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.nivel.Descricao === this.nivel) && (this.vagasFiltro[i].Part.cidade.Cidade === this.cidade)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else if((this.area != 'p') && (this.cidade != 'p')){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.areaResponsavelNew === this.area) && (this.vagasFiltro[i].Part.cidade.Cidade === this.cidade)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else if(this.area != 'p'){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.areaResponsavelNew === this.area)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else if(this.nivel != 'p'){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.nivel.Descricao === this.nivel)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else if(this.cidade != 'p'){
			let i = 0;
			let length = this.vagasFiltro.length;
			let vagas = [];
			for(i;i<length;i++){
				if((this.vagasFiltro[i].Part.cidade.Cidade === this.cidade)) {
					vagas.push(this.vagasFiltro[i]);
				}
			}

			this.vagas = [];
			this.vagas = vagas;
		}
		else {
			this.vagas = [];
			this.vagas = this.vagasFiltro;
		}
	}

	filtrarPalavra(){
		let string = this.filtro;
		let array = [];

		array = this.vagasFiltro.filter((el) => {
			this.palavra = el.Part.nome;
			let str = this.tirarAcento();
			let stri = this.tirarAcentoFiltro();
			console.log(str, stri);
			return str.indexOf(stri) >= 0;
		});
		console.log(array);
		this.vagas = array;
	}

	someMethod(event:any){
		if(this.filtrarPalavra){
			this.filtrarPalavra()
		}
		else {
			this.vagas = this.vagasFiltro
		}
	}

	tirarAcentoFiltro() {
		console.log(this.filtroPalavra);
		let palavra = this.filtroPalavra;
		var palavraSemAcento = "";
		var caracterComAcento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
		var caracterSemAcento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";

		for (var i = 0; i < palavra.length; i++)
		{
			var char = palavra.substr(i, 1);
			var indexAcento = caracterComAcento.indexOf(char);
			if (indexAcento != -1) {
				palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
			} else {
				palavraSemAcento += char;
			}
		}

		return palavraSemAcento.toLocaleLowerCase()
	}

	tirarAcento(){
		let palavra = this.palavra;
		var palavraSemAcento = "";
		var caracterComAcento = "áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ";
		var caracterSemAcento = "aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC";

		for (var i = 0; i < palavra.length; i++)
		{
			var char = palavra.substr(i, 1);
			var indexAcento = caracterComAcento.indexOf(char);
			if (indexAcento != -1) {
				palavraSemAcento += caracterSemAcento.substr(indexAcento, 1);
			} else {
				palavraSemAcento += char;
			}
		}

		return palavraSemAcento.toLocaleLowerCase()
	}

	preventWrongWrapping (text : string) {
		return text.replace(/-/g, '‑')
	}
}
