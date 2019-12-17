$(function(){
    $.ajax("/burgers",{type:"GET"})
    .then(function(data) {
        var savedBurgers =$(".save");
        var devouredBurgers =$(".devour");

        console.log("loo")

        var burgers =data.burgers
        var len = burgers.length

        for (var i=0; i<len;i++){
            var newB = '<li>'+ burgers[i].id +". " + burgers[i].burger_name

            newB += '<button class="devourIt" data-id="'+burgers[i].id+'" data-status="'+!burgers[i].devoured+'">'

            if(burgers[i].devoured){
                newB += '<i class="fa fa-thumbs-up" aria-hidden="true"></i>'
            }else{
                newB +="Devour"
            }
            newB+='</button>'
            newB += '<button class="deleteIt" data-id="'+burgers[i].id+'"><i class="fa fa-trash" aria-hidden="true"></i></button>'+'</li>';

            if(burgers[i].devoured){
                devouredBurgers.append(newB);
            }else{
                savedBurgers.append(newB);
            }
            
        }

 
    })

    $(document).on("click",".devourIt", function(event){
        var id = $(this).data("id");
        var dev = $(this).data("status")===true;
        var newDev = {devoured:dev};

        $.ajax("/burgers/" + id, {
            type: "PUT",
            data: JSON.stringify(newDev),
            dataType:'json',
            contentType: 'application/json'
          }).then(function() {
            console.log("changed sleep to", newDev);
            // Reload the page to get the updated list
            location.reload();
          });

    })

    $(document).on("click", ".deleteIt", function(event) {
        var id = $(this).data("id");
    
        // Send the DELETE request.
        $.ajax("/burgers/" + id, {
          type: "DELETE"
        }).then(function() {
          console.log("deleted cat", id);
          // Reload the page to get the updated list
          location.reload();
        });
      });


      $(".create-form").on("submit", function(event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
    
        var newBur = {
            burger_name: $("#bur")
            .val()
            .trim()
        };
    
        // Send the POST request.
        $.ajax("/burgers", {
          type: "POST",
          data: JSON.stringify(newBur),
          dataType:'json',
          contentType: 'application/json'
        }).then(function() {
          console.log("created new burger!");
          // Reload the page to get the updated list
          location.reload();
        });
      });
     


















})