const ItemCtrl  =   (function(){

    const Item  =   function(id, nama, harga){
        this.id     =   id;
        this.nama   =   nama;
        this.harga  =   harga;
    }

    const data = {
        items: [
            // {id: 0, nama: 'SEO', harga: 120000},
            // {id: 1, nama: 'Google Addboard', harga: 450000},
            // {id: 2, nama: 'Fullstack Web', harga: 600000},
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
        getItemById : function(id){
            //made id
            let found = null;

            data.item.forEach(function(item){
                if(item.id === id){ //looping by id
                    found = item;
                }
            });
            return found;
        },

        setCurrentItem: function(item) {
            data.currentItem = item;
        },

        // get data based on current item
        getCurrentItem: function () {
            return data.currentItem;
        },

        getTotalHarga: function(){
            let total = 0;

            // looping item and add class
            data.items.forEach(function(item){
                total += item.harga;
            });

            // set total data
            data.totalHarga = total;

            // return total
            return data.totalHarga;
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
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNamaPaket: '#nama-paket',
        itemHargaPaket: '#harga-paket',
        totalHarga : '.total-harga'
    }

    return {

        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <b>${item.nama} </b><em>Rp. ${item.harga}</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
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

            document.querySelector(UISelector.itemList).style.display = 'block';

            const li = document.createElement('li');

            li.className = 'collection-item';

            li.id = `item-${item.id}`;

            li.innerHTML = ` <b>${item.nama} </b><em>Rp. ${item.harga}</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`;

            document.querySelector(UISelector.itemList).insertAdjacentElement('beforeend', li);

        },

        clearInput: function() {
            document.querySelector(UISelector.itemNamaPaket).value = '';
            document.querySelector(UISelector.itemHargaPaket).value = '';
        },

        addItemToForm: function() {
            document.querySelector(UISelector.itemNamaPaket).value = ItemCtrl.getCurrentItem().nama;
            document.querySelector(UISelector.itemHargaPaket).value = ItemCtrl.getCurrentItem().harga;

            UICtrl.showEditState();
        },

        showTotalHarga: function(totalHarga) {
            document.querySelector(UISelector.totalHarga).textContent = totalHarga;
        },

        hideList: function(){
            document.querySelector(UISelector.itemList).style.display = 'none'
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

            const  totalHarga = ItemCtrl.getTotalHarga();

            // add total harga to ui
            UICtrl.showTotalHarga(totalHarga);

            UICtrl.clearInput();


        }
        e.preventDefault();
    }

    return {
        init: function(){

            const items =   ItemCtrl.getItems();

            //hide list input item on table
            if(items.length === 0){
                UICtrl.hideList();
            }else {
                UICtrl.populateItemList(items);

            }

            const  totalHarga = ItemCtrl.getTotalHarga();

            // add total harga to ui
            UICtrl.showTotalHarga(totalHarga);
        
            loadEventListeners();
        }
    }

})(ItemCtrl, UICtrl);

App.init();