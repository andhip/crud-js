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
        addItem: function(nama, harga){
            let ID;

            if(data.items.length > 0){
                ID = data.items[data.items.length -1].id + 1;
            }else {
                ID = 0;
            }

            harga = parseInt(harga);

            newItem = new Item(ID, nama, harga);

            data.items.push(newItem);

            return newItem;

        },
        logData:    function() {
            return data;
        }
    }

})();


const UICtrl    =   (function() {
    const UISelector    = {
        itemList: '#item-list',
        addBtn  : '.add-btn',
        itemNamaPaket: '#nama-paket',
        itemHargaPaket: '#harga-paket'
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
        },
        getItemInput: function(){
            return {
                nama : document.querySelector(UISelector.itemNamaPaket).value,
                harga : document.querySelector(UISelector.itemHargaPaket).value
            }
        },

        //Add Item To table
        addListItem: function(item){

            const li = document.createElement('li');

            li.className = 'collection-item';

            li.id = `item-${item.id}`;

            li.innerHTML = ` <b>${item.nama} </b><em>Rp. ${item.harga}</em>
            <a href="#" class="secondary-content">
                <i class="fa fa-pencil"></i>
            </a>`;

            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);

        },

        clearInput: function() {
            document.querySelector(UISelector.itemNamaPaket).value = '';
            document.querySelector(UISelector.itemHargaPaket).value = '';
        },

        getSelector: function(){
            return UISelector;
        }

    }
})();

const App   =   (function(ItemCtrl, UICtrl){

    
    const loadEventListeners = function(){
        
        const UISelector = UICtrl.getSelector();

        document.querySelector(UISelector.addBtn).addEventListener('click', itemAddSubmit);
    }

    const itemAddSubmit = function(e){
        
        const input = UICtrl.getItemInput();

        //kondisi
        if(input.nama !== '' && input.harga !== ''){
            const newItem = ItemCtrl.addItem(input.nama, input.harga);
        
            UICtrl.addListItem(newItem);

            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    return {
        init: function(){

            const items =   ItemCtrl.getItems();

            UICtrl.populateItemList(items);
        
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

App.init();