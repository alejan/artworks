/*
 The MIT License (MIT
 Copyright (c) 2015 Los Andes University
 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:
 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.
 */
(function (ng) {
    var mod = ng.module('artworkModule', ['ngCrud', 'ui.router']);

    mod.constant('artworkModel', {
        name: 'artwork',
        displayName: 'Artwork',
        url: 'artworks',
        fields: {
            name: {
                displayName: 'Name',
                type: 'String',
                required: true
            },
            image: {
                displayName: 'Image',
                type: 'Image',
                required: true
            },
            price: {
                displayName: 'Price',
                type: 'Long',
                required: true
            },
            width: {
                displayName: 'Width',
                type: 'Integer',
                required: true
            },
            height: {
                displayName: 'Height',
                type: 'Integer',
                required: true
            },
            artist: {
                displayName: 'Parent Category',
                type: 'Reference',
                model: 'artistModel',
                options: [],
                required: false
            }
        }
    });
    mod.config(['$stateProvider',
        function ($sp) {
            var basePath = 'src/modules/artwork/';
            var baseInstancePath = basePath + 'instance/';

            $sp.state('artwork', {
                url: '/artworks?page&limit',
                abstract: true,
                parent: 'artistDetail',
                views: {
                    artistChieldView: {
                        templateUrl: basePath + 'artwork.tpl.html',
                        controller: 'artworkCtrl'
                    }
                },
                resolve: {
                    model: 'artworkModel',
                    artworks: ['artist', '$stateParams', 'model', function (artist, $params, model) {
                            return artist.getList(model.url, $params);
                        }],
                       references: ['$q', 'Restangular', function ($q, r) {
                            return $q.all({
                                artist: r.all('artists').getList()
                            });
                        }],
                    client:['Restangular', '$stateParams', function (r) {
                        return r.all("clients").getList().then(function(list){
                            return list[0];
                        });
                    }],
                    latest:['Restangular','model', function(r, model){
                         return r.all(model.url).customGETLIST("latest").then(function(list){
                             return list;
                         });
                    }]  
                }
            });
            $sp.state('artworkList', {
                url: '/list',
                parent: 'artwork',
                views: {
                    artworkView: {
                        templateUrl: basePath + 'list/artwork.list.tpl.html',
                        controller: 'artworkListCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
            $sp.state('artworkNew', {
                url: '/new',
                parent: 'artwork',
                views: {
                    artworkView: {
                        templateUrl: basePath + 'new/artwork.new.tpl.html',
                        controller: 'artworkNewCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
            $sp.state('artworkInstance', {
                url: '/{artworkId:int}',
                abstract: true,
                parent: 'artwork',
                views: {
                    artworkView: {
                        template: '<div ui-view="artworkInstanceView"></div>'
                    }
                },
                resolve: {
                    artwork: ['artworks', '$stateParams', function (artworks, $params) {
                            return artworks.get($params.artworkId);
                        }]
                }
            });
            $sp.state('artworkDetail', {
                url: '/details',
                parent: 'artworkInstance',
                views: {
                    artworkInstanceView: {
                        templateUrl: baseInstancePath + 'detail/artwork.detail.tpl.html',
                        controller: 'artworkDetailCtrl'
                    }
                }
            });
            $sp.state('artworkEdit', {
                url: '/edit',
                sticky: true,
                parent: 'artworkInstance',
                views: {
                    artworkInstanceView: {
                        templateUrl: baseInstancePath + 'edit/artwork.edit.tpl.html',
                        controller: 'artworkEditCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
            $sp.state('artworkDelete', {
                url: '/delete',
                parent: 'artworkInstance',
                views: {
                    artworkInstanceView: {
                        templateUrl: baseInstancePath + 'delete/artwork.delete.tpl.html',
                        controller: 'artworkDeleteCtrl',
                        controllerAs: 'ctrl'
                    }
                }
            });
            $sp.state('artworkCategory', {
                url: '/category',
                parent: 'artworkDetail',
                abstract: true,
                views: {
                    artworkChieldView: {
                        template: '<div ui-view="artworkCategoryView"></div>'
                    }
                },
                resolve: {
                    category: ['artwork', function (artwork) {
                            return artwork.getList('category');
                        }],
                    model: 'categoryModel'
                }
            });
            $sp.state('artworkCategoryList', {
                url: '/list',
                parent: 'artworkCategory',
                views: {
                    artworkCategoryView: {
                        templateUrl: baseInstancePath + 'category/list/artwork.category.list.tpl.html',
                        controller: 'artworkCategoryListCtrl'
                    }
                }
            });
            $sp.state('artworkCategoryEdit', {
                url: '/edit',
                parent: 'artworkCategory',
                views: {
                    artworkCategoryView: {
                        templateUrl: baseInstancePath + 'category/edit/artwork.category.edit.tpl.html',
                        controller: 'artworkCategoryEditCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                resolve: {
                    pool: ['Restangular', 'model', function (r, model) {
                            return r.all(model.url).getList();
                        }]
                }
            });
            $sp.state('artworkGallery', {
                url: '/artworkGallery',
                views: {
                    mainView: {
                        templateUrl: basePath + 'list/artwork.gallery.tpl.html',
                        controller: 'artworkListCtrl',
                        controllerAs: 'ctrl'
                    }
                },
                resolve: {
                    references: ['$q', 'Restangular', function ($q, r) {
                            return $q.all({
                                artist: r.all('artists').getList()
                            });
                        }],
                    model: 'artworkModel',
                    artworks: ['Restangular', 'model', '$stateParams', function (r, model, $params) {
                            var artworks = r.all(model.url).getList($params);
                            for (var i = 0; i < artworks.length; i++) {
                                artworks[i].artistId = artist.id;
                            }
                            return artworks;
                        }],
                       
                    client:['Restangular', '$stateParams','$rootScope', function (r,$rootScope) {
                        return r.all("clients").getList().then(function(list){
                            return list[0];
                        });
                    }],
                    latest:['Restangular','model', function(r, model){
                         return r.all(model.url).customGETLIST("latest").then(function(list){
                             return list;
                         });
                    }]
                }
            });
            $sp.state('changePassword', {
                url: '/change',
                views: {
                    mainView: {
                        templateUrl: basePath + 'changePassword.tpl.html',
                        controller: 'changePassCtrl'
                    }
                }
            });
            $sp.state('artistGallery', {
                url: '/artistGallery?page&limit',
                views: {
                    mainView: {
                        templateUrl: basePath + 'list/artist.gallery.tpl.html',
                        controller: 'artistGalleryListCtrl',
                        controllerAs: 'ctrl'
                    },
                    "artworkCreateView@artistGallery":{
                        templateUrl: basePath + 'new/artwork.new.tpl.html'
                    },
                    "artworkEditView@artistGallery":{
                        templateUrl: basePath + 'instance/edit/artwork.edit.tpl.html'
                    }
                },
                resolve: {
                    model: 'artworkModel',
                    artist: ['Restangular',function(r){
                        return r.all("artists").getList().then(function(list){
                            return list[0];
                        });
                    }],
                    artworks: ['Restangular', 'model', function (r, model) {
                        return r.all(model.url).getList();
                    }],
                    artistArtworks: ['$rootScope','artist', 'model', '$stateParams', function ($rootScope, artist, model, $params) {
                        return artist.getList(model.url, {userName: $rootScope.usuario.$object.userName, limit: $params.limit, page: $params.page});
                    }],
                    categories: ['Restangular',function(r){
                        return r.all("categorys").customGET('parents/').then(function (response) {
                            return response;
                        });
                    }]
                }
            });
        }]);
})(window.angular);