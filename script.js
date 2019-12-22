var version=5;

$(function(){
    
    $('button:not([disabled])').click(function(){
        new Audio('assets/click.mp3').play();
    });
    
    $('#upload').click(function(){
        $('input[type=file]').click();
    });
    
    $('input[type=file]').change(function(e){
        $('#count').removeClass();
        $('#download').attr('disabled',true);
        var notOgg=0;
        Array.prototype.forEach.call($('input[type=file]')[0].files,f=>{
            if(f.type!='audio/ogg'){
                notOgg++;
            };
        });
        if(notOgg==0){
            var count=this.files.length;
            if(count==12){
                $('#count').text('12/12');
                $('#count').addClass('green');
                $('#download').attr('disabled',false);
            }else{
                $('#count').text(count+'/12');
                $('#count').addClass('red');
            }
        }else{
            $('#count').text(notOgg+' files are not OGG!');
            $('#count').addClass('red');
        }
    });
    
    $('#version').click(function(){
        if(version==5){
            version=1;
            $(this).text('1.6 - 1.8');
        }else if(version==1){
            version=2;
            $(this).text('1.9 - 1.10');
        }else if(version==2){
            version=3;
            $(this).text('1.11 - 1.12');
        }else if(version==3){
            version=4;
            $(this).text('1.13 - 1.14');
        }else if(version==4){
            version=5;
            $(this).text('1.15');
        }
    });
    
    $('#download').click(function(){
        var notOgg=0;
        Array.prototype.forEach.call($('input[type=file]')[0].files,f=>{
            if(f.type!='audio/ogg'){
                notOgg++;
            };
        });
        if(notOgg==0&&$('input[type=file]')[0].files.length==12){
            
            $('#download').attr('disabled',true);
            
            var names=['11','13','blocks','cat','chirp','far','mall','mellohi','stal','strad','wait','ward'],
                namePos=0,
                zip=new JSZip();
            
            zip.file('pack.mcmeta','{"pack":{"pack_format":'+version+',"description": "Custom Discs\nu.nu/mccd"}}');
            var music=zip.folder('assets').folder('minecraft').folder('sounds').folder('records');
            
            Array.prototype.forEach.call($('input[type=file]')[0].files,f=>{
                var r=new FileReader();
                r.onload=function(){
                    $('#download').text(Math.floor((namePos+1)*100/12)+'%');
                    music.file(names[namePos]+'.ogg',r.result.split('base64,')[1],{base64: true});
                    namePos++;
                    if(namePos==12){
                        $('#download').text('Please wait...');
                        zip.generateAsync({type:"blob"}).then(function(c){
                            if($('#name').val().length>0){
                                saveAs(c,$('#name').val()+'.zip');
                            }else{
                                saveAs(c,'Custom Discs.zip');
                            }
                            $('#download').attr('disabled',false);
                            $('#download').text('Download resource pack');
                        });
                    }
                };
                r.readAsDataURL(f);
                
            });
            
        }
    });
    
});