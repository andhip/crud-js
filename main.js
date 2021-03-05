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

            data.items.forEach(function(item){
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

        clearEditState: function(){
            UICtrl.clearInput();
            document.querySelector(UISelector.updateBtn).style.display = 'none';
            document.querySelector(UISelector.deleteBtn).style.display = 'none';
            document.querySelector(UISelector.backBtn).style.display = 'none';
            document.querySelector(UISelector.addBtn).style.display = 'inline';
        },

        showEditState: function(){
            document.querySelector(UISelector.updateBtn).style.display = 'inline';
            document.querySelector(UISelector.deleteBtn).style.display = 'inline';
            document.querySelector(UISelector.backBtn).style.display = 'inline';
            document.querySelector(UISelector.addBtn).style.display = 'none';
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
        document.querySelector(UISelector.itemList).addEventListener('click', itemUpdateSubmmit);
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
    // update data
    const itemUpdateSubmmit = function(e) {
        if(e.target.classList.contains('edit-item')){
            
            // take list item based on id
            const listId = e.target.parentNode.parentNode.id;

            // put in an array
            // split membagi kedalam array
            const lisstIdArr = listId.split('-');
            // Take the real ID
            const id = parseInt(lisstIdArr[1]);
            // take an item
            const itemToEdit = ItemCtrl.getItemById(id);

            ItemCtrl.setCurrentItem(itemToEdit);

            UICtrl.addItemToForm()
        }
        // avoid the default from DOM
        e.preventDefault();
    }

    return {
        init: function(){

            UICtrl.clearEditState();

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