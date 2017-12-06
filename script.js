$(function() {
    console.log('ready!');
});

function randomString() { // LOSOWANIE id DO KOLUMN I KART
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
}

function Column(name) { //KLASA/KONSTRUKTOR
    var self = this;

    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
        // TWORZENIE KOLUMN
        var $column = $('<div>').addClass('column');
        var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
        var $columnCardList = $('<ul>').addClass('column-card-list');
        var $columnDelete = $('<button>').addClass('btn-delete-col').text('x');
        var $columnAddCard = $('<button>').addClass('add-card').text('+');

        // ZAKŁADANIE ZDARZEŃ
        $columnDelete.click(function() {
            self.removeColumn();
        });
        $columnAddCard.click(function(event) {
            self.addCard(new Card(prompt("Enter the name of the card")));
        });

        // TWORZENIE ELEMENTÓW KOLUMN
        $column.append($columnTitle)
            .append($columnDelete)
            .append($columnAddCard)
            .append($columnCardList);

        // ZWRACANIE ELEMENTÓW KOLUMN
        return $column;
    }
};

Column.prototype = { //PROTOTYPY COLUMN
    addCard: function(card) {
        this.$element.children('ul').append(card.$element);
    },
    removeColumn: function() {
        this.$element.remove();
    }
};



function Card(description) { //PROTOTYP CARD
    var self = this;

    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
        // TWORZENIE KART
        var $card = $('<li>').addClass('card');
        var $cardDescription = $('<p>').addClass('card-description').text(self.description);
        var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');

        // PRZYPIĘCIE ZDARZENIA
        $cardDelete.click(function() {
            self.removeCard();
        });

        // SKŁADANIE I ZWRACANIE KARTY
        $card.append($cardDelete)
            .append($cardDescription);

        return $card;
    }
    if (description.length > 30) {
        alert('Max 30 znaków!!')
        removeCard();
    } else if (description.length == 0) {
        alert('wpisz nazwę karty!!')
        removeCard();
    }
}

Card.prototype = { //PROTOTYP CARD
    removeCard: function() {
        this.$element.remove();
    }
}



var board = {
    name: 'Kanban Board',
    addColumn: function(column) {
        this.$element.append(column.$element);
        initSortable();
    },
    $element: $('#board .column-container')
};

function initSortable() {
    $('.column-card-list').sortable({
        connectWith: '.column-card-list',
        placeholder: 'card-placeholder'
    }).disableSelection();
}


$('.create-column')
    .click(function() {
        var name = prompt('Enter a column name');
        if (name != null) {
            if (name.length > 10) {
                alert('Max 10 znaków!!');
            } else if (name.length == 0) {
                alert('Wpisz nazwe!!');
            } else {
                var column = new Column(name);
                board.addColumn(column);
            }            
        }
    });

// TWORZENIE KOLUMN
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');

// DODAWANIE KOLUMN DO TABLICY
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);
