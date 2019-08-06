// Init F7 Vue Plugin
var myApp = Framework7.use(Framework7Vue);


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;


// Init Page Components
Vue.component('page-about', {
  template: '#page-about'
});
Vue.component('main-view', {
  template: '#main-view'
});
Vue.component('page-news', {
  template: '#page-news'
});
Vue.component('page-instituicoes', {
  template: '#page-instituicoes'
});
Vue.component('page-alesc', {
  template: '#page-alesc'
});
Vue.component('page-brde', {
  template: '#page-brde'
});
Vue.component('page-cidasc', {
  template: '#page-cidasc'
});
Vue.component('page-epagri', {
  template: '#page-epagri'
});
Vue.component('page-escoteiros', {
  template: '#page-escoteiros'
});
Vue.component('page-fapesc', {
  template: '#page-fapesc'
});
Vue.component('page-ima', {
  template: '#page-ima'
});
Vue.component('page-fetaesc', {
  template: '#page-fetaesc'
});
Vue.component('page-baciashidrograficas', {
  template: '#page-baciashidrograficas'
});
Vue.component('page-fundacaogaia', {
  template: '#page-fundacaogaia'
});
Vue.component('page-furb', {
  template: '#page-furb'
});
Vue.component('page-iar', {
  template: '#page-iar'
});
Vue.component('page-ifsc', {
  template: '#page-ifsc'
});
Vue.component('page-noah', {
  template: '#page-noah'
});
Vue.component('page-bpma', {
  template: '#page-bpma'
});
Vue.component('page-reasul', {
  template: '#page-reasul'
});
Vue.component('page-sdssc', {
  template: '#page-sdssc'
});
Vue.component('page-sedsc', {
  template: '#page-sedsc'
});
Vue.component('page-ufsc', {
  template: '#page-ufsc'
});
Vue.component('page-undime', {
  template: '#page-undime'
});
Vue.component('page-unisul', {
  template: '#page-unisul'
});
Vue.component('page-univali', {
  template: '#page-univali'
});
Vue.component('page-unoesc', {
  template: '#page-unoesc'
});
Vue.component('page-filter', {
  template: '#page-filter'
});
Vue.component('page-form', {
  template: '#page-form'
});
Vue.component('page-dynamic-routing', {
  template: '#page-dynamic-routing'
});
Vue.component('page-not-found', {
  template: '#page-not-found'
});



//
//var $$ = Dom7;
//$$('form.form-ajax-submit').on('formajax:success', function (e) {
//  var xhr = e.detail.xhr; // actual XHR object
//  console.log(xhr);
//
//  var data = e.detail.data; // Ajax response from action file
// do something with response data
//  console.log(data);
//});


var dados = new Object();
var pageAtual = 0;
var pageCount = 0;
var topicoAtual = 8;
var pagesLength = 0;
var pagesLengthReal = 0.0;

// ///////////////////  //
//                      //
//     Noticias  = 8;   //
//     Projetos  = 9;   //
//     Agenda    = 8;   //
//     Gteas     = 16;  //
//                      //
// ///////////////////  //

atualizaNoticias(8, 1);


function pesquisar(pesquisa, categoria) {
  Framework7.request({
    url: 'http://localhost/portal/webservice/index.php?search=' + pesquisa + '&catid=' + categoria,
    method: "POST",
    data: 'inicial',
    dataType: 'json',
    crossDomain: true,
    statusCode: {
      200: function (xhr) {
        console.log(xhr.response)
        dados = JSON.parse(xhr.response);

        pageAtual = 1;
        pageCount = ((pageAtual - 1) * 10)
        if (pageAtual == pagesLength) {
          pageCount = pageCount + (pagesLengthReal);
        }
        console.log(pageAtual);
        for (i = 0; i <= 9; i++) {
          let image = dados[pageCount].images;
          let link = '';
          // for (j = 16; j <= image.length - 3; j++) {
          //   link += image[j];
          // }
          image = JSON.parse(image);
          link = image.image_intro;

          if (link == "") {
            link = "images/logotopo.png";
          }

          let background = 'url("http://educacaoambiental.sds.sc.gov.br/' + link + '")';
          console.log(background);
          let descricao = document.getElementById('noticia' + i + 'titulo');
          let data = document.getElementById('noticia' + i + 'data');
          let imageId = 'image' + i;
          let linkRota = document.getElementById('news' + i);
          let noticiaid = document.getElementById('noticia' + i + 'id');
          // console.log(imageId);
          document.getElementById(imageId).style.backgroundImage = background;
          // linkRota.href = '/news/' + dados[i].title + '/' + dados[i].created + '/';
          descricao.innerHTML = dados[pageCount].title;
          data.innerText = 'Publicado em ' + dados[pageCount].created;
          noticiaid.value = dados[pageCount].id;
          pageCount++;
        }
        pagesLengthReal = ((dados["length"] % 10));
        pagesLength = Math.trunc(dados["length"] / 10);
      }
    }
  });
}

function atualizaNoticias(catid, nextPage, search) {
  if (search===undefined) {
    Framework7.request({
      url: 'http://localhost/portal/webservice/index.php?catid=' + catid,
      method: "POST",
      data: 'inicial',
      dataType: 'json',
      crossDomain: true,
      statusCode: {
        200: function (xhr) {
          console.log(xhr.response)
          dados = JSON.parse(xhr.response);


          pageAtual = nextPage;
          pageCount = ((pageAtual - 1) * 10)
          if (pageAtual == pagesLength) {
            pageCount = pageCount + (pagesLengthReal);
          }
          console.log(pageAtual);
          for (i = 0; i <= 9; i++) {
            let image = dados[pageCount].images;
            let link = '';
            // for (j = 16; j <= image.length - 3; j++) {
            //   link += image[j];
            // }
            image = JSON.parse(image);
            link = image.image_intro;

            if (link == "") {
              link = "images/logotopo.png";
            }

            let background = 'url("http://educacaoambiental.sds.sc.gov.br/' + link + '")';
            console.log(background);
            let descricao = document.getElementById('noticia' + i + 'titulo');
            let data = document.getElementById('noticia' + i + 'data');
            let imageId = 'image' + i;
            let linkRota = document.getElementById('news' + i);
            let noticiaid = document.getElementById('noticia' + i + 'id');
            // console.log(imageId);
            document.getElementById(imageId).style.backgroundImage = background;
            // linkRota.href = '/news/' + dados[i].title + '/' + dados[i].created + '/';
            descricao.innerHTML = dados[pageCount].title;
            data.innerText = 'Publicado em ' + dados[pageCount].created;
            noticiaid.value = dados[pageCount].id;
            pageCount++;
          }
          pagesLengthReal = ((dados["length"] % 10));
          pagesLength = Math.trunc(dados["length"] / 10);
        }
      }
    })
  } else {
    pageAtual = nextPage;
    pageCount = ((pageAtual - 1) * 10)
    if (pageAtual == pagesLength) {
      pageCount = pageCount + (pagesLengthReal);
    }
    console.log(pageAtual);
    for (i = 0; i <= 9; i++) {
      let image = dados[pageCount].images;
      let link = '';
      // for (j = 16; j <= image.length - 3; j++) {
      //   link += image[j];
      // }
      image = JSON.parse(image);
      link = image.image_intro;

      if (link == "") {
        link = "images/logotopo.png";
      }

      let background = 'url("http://educacaoambiental.sds.sc.gov.br/' + link + '")';
      console.log(background);
      let descricao = document.getElementById('noticia' + i + 'titulo');
      let data = document.getElementById('noticia' + i + 'data');
      let imageId = 'image' + i;
      let linkRota = document.getElementById('news' + i);
      let noticiaid = document.getElementById('noticia' + i + 'id');
      // console.log(imageId);
      document.getElementById(imageId).style.backgroundImage = background;
      // linkRota.href = '/news/' + dados[i].title + '/' + dados[i].created + '/';
      descricao.innerHTML = dados[pageCount].title;
      data.innerText = 'Publicado em ' + dados[pageCount].created;
      noticiaid.value = dados[pageCount].id;
      pageCount++;
    }
    pagesLengthReal = ((dados["length"] % 10));
    pagesLength = Math.trunc(dados["length"] / 10);
  }
}

function totalPages() {
  return dados["length"];
}

var newsNumber = 0;
var oi = "oiiiiiiiiiiiiiiiiii";
function newsCount(number) {
  newsNumber = number;
  oi = newsNumber;
}

function searchNews() {
  var search = document.getElementById('search').value;
  pesquisar(search, topicoAtual);
  atualizaPage(1);
};


// Init App
new Vue({
  el: '#app',
  data: function () {
    return {
      // Framework7 parameters here
      f7params: {
        root: '#app', // App root element
        id: 'io.framework7.cieasc', // App bundle ID
        name: 'Portal de Educaçao Ambiental / SC', // App name
        theme: 'auto', // Automatic theme detection
        // App routes
        routes: [
          {
            path: '/about/',
            component: 'page-about'
          },
          {
            // path: '/news/:title/:date/:',
            // component: 'page-news'
            // template: `<div class="page">`+`<div class="navbar"><div class="navbar-inner sliding"><div class="left"><a href="#" class="link icon-only back icon-only">
            // <i class="icon icon-back"></i></a></div><div class="title">Educação Ambiental</div></div></div><div class="page-content"> <div class="block titleNews">
            // <h1 id="newsTitle">{{$route.params.title}}</h1></div> <div class="block"><div><h3 id="newsDate">Publicado em {{$route.params.date}}.</h3> <p></p></div></div> <div class="block block-strong">
            // <p></p> <img src="src/imgs/logotopo.png"><img src="src/imgs/fapesc.png"></div> <div class="block"><img src="src/imgs/footer.jpg" style="height: 100px; width: 100%;"></div></div></div>`,
            path: '/news/0',
            async: function (routeTo, routeFrom, resolve, reject) {
              // Requested route
              console.log(routeTo);


              //  let id = $route.params.id;
              var id = document.getElementById('noticia0id').value;
              console.log(id);

              // Get external data and return template7 template
              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    // How and what to load: template

                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    // Custom template context
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/1',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia1id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/2',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia2id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/3',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia3id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/4',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia4id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/5',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia5id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/6',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia6id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/7',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia7id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/8',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia8id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/news/9',
            async: function (routeTo, routeFrom, resolve, reject) {
              console.log(routeTo);
              var id = document.getElementById('noticia9id').value;
              console.log(id);

              this.app.request.json('http://educacaoambiental.sds.sc.gov.br/app_request.php?id=' + id, function (data) {
                crossDomain: true,
                  resolve(
                    {
                      template: '<div class="page">{{noticia}}</div>',
                    },
                    {
                      context: {
                        noticia: data['data'],
                      },
                    },
                    console.log(data)
                  );
              });
            }
          },
          {
            path: '/main-view/',
            component: 'main-view'
          },
          {
            path: '/instituicoes/',
            component: 'page-instituicoes'
          },
          {
            path: '/alesc/',
            component: 'page-alesc'
          },
          {
            path: '/brde/',
            component: 'page-brde'
          },
          {
            path: '/filter/',
            component: 'page-filter'
          },
          {
            path: '/cidasc/',
            component: 'page-cidasc'
          },
          {
            path: '/epagri/',
            component: 'page-epagri'
          },
          {
            path: '/escoteiros/',
            component: 'page-escoteiros'
          },
          {
            path: '/fapesc/',
            component: 'page-fapesc'
          },
          {
            path: '/ima/',
            component: 'page-ima'
          },
          {
            path: '/fetaesc/',
            component: 'page-fetaesc'
          },
          {
            path: '/baciashidrograficas/',
            component: 'page-baciashidrograficas'
          },
          {
            path: '/fundacaogaia/',
            component: 'page-fundacaogaia'
          },
          {
            path: '/furb/',
            component: 'page-furb'
          },
          {
            path: '/iar/',
            component: 'page-iar'
          },
          {
            path: '/ifsc/',
            component: 'page-ifsc'
          },
          {
            path: '/noah/',
            component: 'page-noah'
          },
          {
            path: '/bpma/',
            component: 'page-bpma'
          },
          {
            path: '/reasul/',
            component: 'page-reasul'
          },
          {
            path: '/sdssc/',
            component: 'page-sdssc'
          },
          {
            path: '/sedsc/',
            component: 'page-sedsc'
          },
          {
            path: '/ufsc/',
            component: 'page-ufsc'
          },
          {
            path: '/undime/',
            component: 'page-undime'
          },
          {
            path: '/unisul/',
            component: 'page-unisul'
          },
          {
            path: '/univali/',
            component: 'page-univali'
          },
          {
            path: '/unoesc/',
            component: 'page-unoesc'
          },
          {
            path: '/form/',
            component: 'page-form'
          },
          {
            path: '/dynamic-route/blog/:blogId/post/:postId/',
            component: 'page-dynamic-routing'
          },
          {
            path: '(.*)',
            component: 'page-not-found',
          },
        ],
      }
    }
  },
});

document.getElementById('filtroNoticias').onclick = function () {
  if (topicoAtual == 8) {

  } else {
    topicoAtual = 8;
    pageAtual = 1;
  }
  let logoMenu = document.getElementById('logoMenu');
  logoMenu.src = "src/imgs/logotopo.png";
  atualizaNoticias(8, pageAtual)
  document.getElementById('nomeFiltros').innerText = 'NOTÍCIAS';
  atualizaPage(1);
};

document.getElementById('filtroProjetos').onclick = function () {
  if (topicoAtual == 9) {

  } else {
    topicoAtual = 9;
    pageAtual = 1;
  }
  let logoMenu = document.getElementById('logoMenu');
  logoMenu.src = "src/imgs/logotopo.png";
  atualizaNoticias(9, pageAtual);
  document.getElementById('nomeFiltros').innerHTML = 'PROJETOS';
  atualizaPage(1);
};

document.getElementById('filtroAgenda').onclick = function () {
  if (topicoAtual == 8) {

  } else {
    topicoAtual = 8;
    pageAtual = 1;
  }
  let logoMenu = document.getElementById('logoMenu');
  logoMenu.src = "src/imgs/logotopo.png";
  atualizaNoticias(8, pageAtual)
  document.getElementById('nomeFiltros').innerText = 'AGENDA';
  atualizaPage(1)
};

document.getElementById('filtroGteas').onclick = function () {
  if (topicoAtual == 16) {

  } else {
    topicoAtual = 16;
    pageAtual = 1;
  }
  let logoMenu = document.getElementById('logoMenu');
  logoMenu.src = "src/imgs/folhinha.png";
  atualizaNoticias(16, pageAtual)
  document.getElementById('nomeFiltros').innerText = 'GTEAS';
  atualizaPage(1);
};


function atualizaPage(icone) {

  let primeiro = document.getElementById('pageLink1');
  let ultimo = document.getElementById('pageLink9');
  let oitavo = document.getElementById("pageLink8");
  let segundo = document.getElementById("pageLink2");
  let terceiro = document.getElementById("pageLink3");
  let quarto = document.getElementById("pageLink4");
  let quinto = document.getElementById("pageLink5");
  let sexto = document.getElementById("pageLink6");
  let setimo = document.getElementById("pageLink7");
  primeiro.style.display = "initial";
  segundo.style.display = "initial";
  terceiro.style.display = "initial";
  quarto.style.display = "initial";
  quinto.style.display = "initial";
  sexto.style.display = "initial";
  setimo.style.display = "initial";
  oitavo.style.display = "initial";
  ultimo.style.display = "initial";


  pageAtual = parseInt(document.getElementById('pageLink' + icone).innerHTML);
  if (pageAtual > 5 && pagesLength > 10 && (pageAtual < pagesLength - 3)) {

    // let proximo = document.getElementById('pageLink'+linkClick).innerHTML;
    let atual = document.getElementById('pageLink5');
    let atualMenosUm = document.getElementById('pageLink4');
    let atualMenosDois = document.getElementById('pageLink3');
    let atualMaisUm = document.getElementById('pageLink6');
    let atualMaisDois = document.getElementById('pageLink7');
    let tresPontosUm = document.getElementById('pageLink2');
    let tresPontosDois = document.getElementById('pageLink8');
    let primeiro = document.getElementById('pageLink1');
    let ultimo = document.getElementById('pageLink9');
    atual.innerHTML = pageAtual;
    atualMenosUm.innerHTML = pageAtual - 1;
    atualMenosDois.innerHTML = pageAtual - 2;
    atualMaisUm.innerHTML = pageAtual + 1;
    atualMaisDois.innerHTML = pageAtual + 2;
    tresPontosUm.innerHTML = '...';
    tresPontosDois.innerHTML = '...';
    primeiro.innerHTML = '1';
    ultimo.innerHTML = pagesLength;

    atualMenosDois.className = 'pageColor'
    atualMenosUm.className = 'pageColor'
    atual.className = 'pageAtualColor';
    atualMaisUm.className = 'pageColor';
    atualMaisDois.className = 'pageColor';

    atualizaNoticias(topicoAtual, pageAtual);

  } else if (pageAtual >= pagesLength - 3 && pagesLength > 5) {
    let primeiro = document.getElementById('pageLink1');
    let ultimo = document.getElementById('pageLink9');
    let tresPontosUm = document.getElementById('pageLink2');
    let ultimoMenosUm = document.getElementById("pageLink8");
    let ultimoMenosDois = document.getElementById("pageLink7");
    let ultimoMenosTres = document.getElementById("pageLink6");
    let ultimoMenosQuatro = document.getElementById("pageLink5");
    let ultimoMenosCinco = document.getElementById("pageLink4");
    let ultimoMenosSeis = document.getElementById("pageLink3");

    let comparacao = 0;
    for (let i = 3; i >= 0; i--) {
      if (pageAtual == pagesLength < i) {
        comparacao = i;
      }
    }
    ultimo.innerHTML = pagesLength;
    ultimoMenosUm.innerHTML = pagesLength - 1;
    ultimoMenosDois.innerHTML = pagesLength - 2;
    ultimoMenosTres.innerHTML = pagesLength - 3;
    ultimoMenosQuatro.innerHTML = pagesLength - 4;
    ultimoMenosCinco.innerHTML = pagesLength - 5;
    ultimoMenosSeis.innerHTML = pagesLength - 6;
    tresPontosUm.innerHTML = '...';
    primeiro.innerHTML = '1';

    switch (pageAtual) {
      case pagesLength - 6:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageAtualColor';
        ultimoMenosCinco.className = 'pageColor';
        ultimoMenosQuatro.className = 'pageColor';
        ultimoMenosTres.className = 'pageColor';
        ultimoMenosDois.className = 'pageColor';
        ultimoMenosUm.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case pagesLength - 5:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageColor';
        ultimoMenosCinco.className = 'pageAtualColor';
        ultimoMenosQuatro.className = 'pageColor';
        ultimoMenosTres.className = 'pageColor';
        ultimoMenosDois.className = 'pageColor';
        ultimoMenosUm.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case pagesLength - 4:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageColor';
        ultimoMenosCinco.className = 'pageColor';
        ultimoMenosQuatro.className = 'pageAtualColor';
        ultimoMenosTres.className = 'pageColor';
        ultimoMenosDois.className = 'pageColor';
        ultimoMenosUm.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case pagesLength - 3:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageColor';
        ultimoMenosCinco.className = 'pageColor';
        ultimoMenosQuatro.className = 'pageColor';
        ultimoMenosTres.className = 'pageAtualColor';
        ultimoMenosDois.className = 'pageColor';
        ultimoMenosUm.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case pagesLength - 2:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageColor';
        ultimoMenosCinco.className = 'pageColor';
        ultimoMenosQuatro.className = 'pageColor';
        ultimoMenosTres.className = 'pageColor';
        ultimoMenosDois.className = 'pageAtualColor';
        ultimoMenosUm.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case pagesLength - 1:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageColor';
        ultimoMenosCinco.className = 'pageColor';
        ultimoMenosQuatro.className = 'pageColor';
        ultimoMenosTres.className = 'pageColor';
        ultimoMenosDois.className = 'pageColor';
        ultimoMenosUm.className = 'pageAtualColor';
        ultimo.className = 'pageColor';
        break;

      case pagesLength:
        primeiro.className = 'pageColor'
        ultimoMenosSeis.className = 'pageColor';
        ultimoMenosCinco.className = 'pageColor';
        ultimoMenosQuatro.className = 'pageColor';
        ultimoMenosTres.className = 'pageColor';
        ultimoMenosDois.className = 'pageColor';
        ultimoMenosUm.className = 'pageColor';
        ultimo.className = 'pageAtualColor';
        break;
    }

    atualizaNoticias(topicoAtual, pageAtual);

  } else if (pageAtual <= 5 && pagesLength > 9) {
    let primeiro = document.getElementById('pageLink1');
    let ultimo = document.getElementById('pageLink9');
    let oitavo = document.getElementById("pageLink8");
    let segundo = document.getElementById("pageLink2");
    let terceiro = document.getElementById("pageLink3");
    let quarto = document.getElementById("pageLink4");
    let quinto = document.getElementById("pageLink5");
    let sexto = document.getElementById("pageLink6");
    let setimo = document.getElementById("pageLink7");

    primeiro.innerHTML = 1;
    segundo.innerHTML = 2;
    terceiro.innerHTML = 3;
    quarto.innerHTML = 4;
    quinto.innerHTML = 5;
    sexto.innerHTML = 6;
    setimo.innerHTML = 7;
    oitavo.innerHTML = '...';
    ultimo.innerHTML = pagesLength;

    switch (pageAtual) {
      case 1:
        primeiro.className = 'pageAtualColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 2:
        primeiro.className = 'pageColor'
        segundo.className = 'pageAtualColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 3:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageAtualColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 4:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageAtualColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 5:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageAtualColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 6:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageAtualColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 7:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageAtualColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

    }
    atualizaNoticias(topicoAtual, pageAtual, true);

  } else if (pageAtual <= 5 && pagesLength < 9) {
    let primeiro = document.getElementById('pageLink1');
    let ultimo = document.getElementById('pageLink9');
    let oitavo = document.getElementById("pageLink8");
    let segundo = document.getElementById("pageLink2");
    let terceiro = document.getElementById("pageLink3");
    let quarto = document.getElementById("pageLink4");
    let quinto = document.getElementById("pageLink5");
    let sexto = document.getElementById("pageLink6");
    let setimo = document.getElementById("pageLink7");

    for (i = 1; i < pagesLength; i++) {
      switch (pagesLength) {
        case 1:
          segundo.style.display = "none";
          terceiro.style.display = "none";
          quarto.style.display = "none";
          quinto.style.display = "none";
          sexto.style.display = "none";
          setimo.style.display = "none";
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 2:
          terceiro.style.display = "none";
          quarto.style.display = "none";
          quinto.style.display = "none";
          sexto.style.display = "none";
          setimo.style.display = "none";
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 3:
          quarto.style.display = "none";
          quinto.style.display = "none";
          sexto.style.display = "none";
          setimo.style.display = "none";
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 4:
          quinto.style.display = "none";
          sexto.style.display = "none";
          setimo.style.display = "none";
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 5:
          sexto.style.display = "none";
          setimo.style.display = "none";
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 6:
          setimo.style.display = "none";
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 7:
          oitavo.style.display = "none";
          ultimo.style.display = "none";
          break;
        case 8:
          ultimo.style.display = "none";
          break;
      }
    }

    primeiro.innerHTML = 1;
    segundo.innerHTML = 2;
    terceiro.innerHTML = 3;
    quarto.innerHTML = 4;
    quinto.innerHTML = 5;
    sexto.innerHTML = 6;
    setimo.innerHTML = 7;
    oitavo.innerHTML = 8;
    ultimo.innerHTML = 9;


    switch (pageAtual) {
      case 1:
        primeiro.className = 'pageAtualColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 2:
        primeiro.className = 'pageColor'
        segundo.className = 'pageAtualColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 3:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageAtualColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 4:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageAtualColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 5:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageAtualColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 6:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageAtualColor';
        setimo.className = 'pageColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

      case 7:
        primeiro.className = 'pageColor'
        segundo.className = 'pageColor';
        terceiro.className = 'pageColor';
        quarto.className = 'pageColor';
        quinto.className = 'pageColor';
        sexto.className = 'pageColor';
        setimo.className = 'pageAtualColor';
        oitavo.className = 'pageColor';
        ultimo.className = 'pageColor';
        break;

    }

    atualizaNoticias(topicoAtual, pageAtual, true);
  }





}
