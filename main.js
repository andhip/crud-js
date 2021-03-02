const ItemCtrl  =   (function(){

    const Item  =   function(id, nama, harga){
        this.id     =   id;
        this.nama   =   nama;
        this.harga  =   harga;
    }

    const data = {
        items: [
            {id: 0, nama: 'SEO', harga: 120000},
            {id: 1, nama: 'Google Addboard', harga: 450000},
            {id: 2, nama: 'Fullstack Web', harga: 600000},
        ],

        currenItem: null,
        totalHarga: 0
    }

    return {
        getItems : function() {
            return data.items;
        },
        logData:    function() {
            return data;
        }
    }

})();


const UICtrl    =   (function() {
    const UISelector    = {
        itemList: '#item-list'
    }

    return {

        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <b>${item.nama} </b><em>Rp. ${item.harga}</em>
                <a href="#" class="secondary-content">
                    <i class="fa fa-pencil"></i>
                </a>
            </li>`;
            
            });
        
            document.querySelector(UISelector.itemList).innerHTML   =   html;
        }

    }
})();

const App   =   (function(ItemCtrl, UICtrl){

    return {
        init: function(){

            const items =   ItemCtrl.getItems();

            UICtrl.populateItemList(items);
        }
    }

})(ItemCtrl, UICtrl);

App.init();