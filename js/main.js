jQuery(function($) {
	//Next Capsule CountDown - Only for DEV purpose
	var date = new Date;
	var CapsuleYear = date.getFullYear();
	var CapsuleMonth = date.getMonth()+1;
	var CapsuleRandomDay = 1+Math.floor(Math.random()*30);
	$nextCapsule = CapsuleYear+"/"+CapsuleMonth+"/"+CapsuleRandomDay;
	// Get User Location
	var userIP;
	$.ajax({
		type: 'GET',
		url: 'http://ipinfo.io',
		dataType: 'json',
		async: false,
		success: function (response) {
			// console.log(response.country); 
			userIP = response.country;
		}
	});
	// Language check
	var lng = '';
	if (userIP === 'PL') {
		lng = 'pl';
		$('#modalAddBrandLabel').html('Aby użyć autokoretky wystarczy trzymając klawisz ctrl, kliknąć prawym przyciskiem myszki.')
	} else if (userIP === 'JP') {
		lng = 'jp';
	} else {
		lng = 'en';
	}
	//Home button
	setTimeout(function(){
		$('.home-group-button').css('display', 'inline-block');
	}, 300);
	//Preloader
	$('.preloader').remove();

	//#main-slider
	var slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home-slider .item').css('height',slideHeight);
	});
	$('.carousel').carousel({
	    pause: false
	});
	//First Page Slider Text
	setInterval(function() {
		$('.slideText > div:first')
		    .fadeOut(1000)
		    .next()
		    .fadeIn(1000)
		    .end()
		    .appendTo('.slideText');
	}, 6000);
	//Mednu Slider Text
	setTimeout(function(){
		setInterval(function() {
			$('.MenuSlideText > div:first')
			    .fadeOut(1000)
			    .next()
			    .fadeIn(1000)
			    .end()
			    .appendTo('.MenuSlideText');
		}, 6000);
	}, 1000);
    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
	// Editor
	CKEDITOR.editorConfig = function( config ) {
		config.language = lng;
		config.skin = 'office2013';
		config.disableNativeSpellChecker = false;
		config.browserContextMenuOnCtrl = true;
		config.extraPlugins = 'videodetector';
		config.toolbar = [
			{ name: 'document', items: [ 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
			{ name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
			{ name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-' ] },
			{ name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
			'/',
			{ name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
			{ name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
			{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
			{ name: 'insert', items: [ 'Image', 'VideoDetector' ,'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
			'/',
			{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
			{ name: 'colors', items: [ 'TextColor', 'BGColor' ] }
		];
		config.removeButtons = 'Underline,Subscript,Superscript';

		// Set the most common block elements.
		config.format_tags = 'p;h1;h2;h3;pre';

		// Simplify the dialog windows.
		config.removeDialogTabs = 'image:advanced;link:advanced';
	};
	CKEDITOR.replace('editor1');
	//Protopy for CKEDITOR in modal
	$.fn.modal.Constructor.prototype.enforceFocus = function () {
	    modal_this = this
	    $(document).on('focusin.modal', function (e) {
	        if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
	        // add whatever conditions you need here:
	        &&
	        !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select') && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')) {
	            modal_this.$element.focus()
	        }
	    })
	};
    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });
 	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>slideHeight ){
			$('#mainNav').addClass('navbar-fixed-top');
			$('body').css({
				'padding-top':'40px'
			});
			$('#capsule-main').css({
				'margin-top':'26px'
			});
			$('.carousel').carousel({
			    pause: true
			});
		} else {
			$('#mainNav').removeClass('navbar-fixed-top');
			$('body').css({
				'padding-top':'0px'
			});
			$('#capsule-main').css({
				'margin-top':'0'
			});
			$('.carousel').carousel({
			    pause: false
			});
		}
	});

 	//Scroll Check
 	var check = $(document).scrollTop();
 	if (check > 0) {
		$('#NavCapsuleLogo').css({
			'display':'none'
		});
	}
 	if (check > 1100) {
		$('#mainNav').addClass('navbar-fixed-top');
	}
	$(window).on('scroll', function(){
		if( $(window).scrollTop()> 48 ){
			$('#NavCapsuleLogo').css({
				'display':'none'
			});
			$('#menuLogo').css({
				'display':'block'
			});
		} else {
			$('#NavCapsuleLogo').css({
				'display':'block'
			});
			$('#menuLogo').css({
				'display':'none'
			});
		}
	});

	//LogoClick
	$('.homeLogoMenu').click(function(event) {
		$('html, body').animate({scrollTop: $('#page-top').offset().top}, 1000);
		return false;
	});

    // Initialize and Configure Scroll Reveal Animation
    window.sr = ScrollReveal();
    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each(contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				alert(winTop > contentTop[i] - rangeTop);
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};
	//Get value of inputs
	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 66}, 1000);
		return false;
	});
	$('#home-button').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 66}, 1000);
	    $('#capsule-form-name').val($('#home-form').val());
		return false;
	});
	$('#home-form').keyup(function(e){
		$('#capsule-form-name').val($('#home-form').val());
	});
	$('#capsule-form-name').keyup(function(e){
		$('#home-form').val($('#capsule-form-name').val());
	});
	$('#home-form').keyup(function(e){
	    if(e.keyCode == 13)
	    {
			$('html, body').animate({scrollTop: $('#capsule').offset().top - 66}, 1000);
			return false;
	    }
	});
	$('#PrevYTButton').on('click', function(){
		var yt = $("#capsule-form-yt").val();
		var splitYT = yt.split('=');
		var splitYTlist = splitYT[1].split('&');
		if (splitYTlist[1] != null ) {
			$('#capsuleYTiframe').html('<iframe src="https://www.youtube.com/embed/'+splitYTlist[0]+'" frameborder="0" allowfullscreen></iframe>');
		} else {
			$('#capsuleYTiframe').html('<iframe src="https://www.youtube.com/embed/'+splitYT[1]+'" frameborder="0" allowfullscreen></iframe>');
		}
	});
	var ytIframe;
	$('#capsule-form-yt').keyup(function(e){
	    if(e.keyCode == 13)
	    {
			var yt = $("#capsule-form-yt").val();
			var splitYT = yt.split('=');
			var splitYTlist = splitYT[1].split('&');
			if (splitYTlist[1] != null ) {
				$('#capsuleYTiframe').html('<iframe src="https://www.youtube.com/embed/'+splitYTlist[0]+'" frameborder="0" allowfullscreen></iframe>');
			} else {
				$('#capsuleYTiframe').html('<iframe src="https://www.youtube.com/embed/'+splitYT[1]+'" frameborder="0" allowfullscreen></iframe>');
			}
			return false;
	    }
	});
  	$('#capulseYTmodal').on('hidden.bs.modal', function () {
  		$('#capsuleYTiframe').html('');
  	});
	//Initiat WOW JS
	new WOW().init();
	
	// Progress Bar
	$('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'),function(){
				$(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	//Time Function
	var capsuleLast = ''; 	//LastCapsule - from database ?
	if (capsuleLast === '') {
	  $(".time").countdown($nextCapsule, function(event) {
	    $(".timeDay").html(
	      event.strftime(
	      	'%D<p>Days</p>'
	      	)
	    );
	    $(".timeHours").html(
	      event.strftime(
	      	'%H<p>Hours</p>'
	      	)
	    );
	    $(".timeMin").html(
	      event.strftime(
	      	'%M<p>Minutes</p>'
	      	)
	    );
	    $(".timeSec").html(
	      event.strftime(
	      	'%S<p>Seconds</p>'
	      	)
	    );
	  });
	}else if (capsuleLast !== '') {
	  $(".timeDay").countdown(capsuleLast, function(event) {
	    $(this).html(
	      event.strftime(
	      	'%D:%H:%M:%S'
	      	)
	    );
	  });		
	}

	// Function to upload to YT our own movie
		// <form id="upload-yt-video" action="https://www.googleapis.com/upload/youtube/v3/videos?part=snippet&access_token=YOUR_TOKEN_HERE" method="post" enctype="multipart/form-data">
		//   <input type="text" name="title" placeholder="Video title">
		//   <textarea name="description" placeholder="Video description"></textarea>
		//   <input type="file" accept="video/*" name="videoFile">
		//   <input type="submit" value="Upload Video">
		// </form>

		// <!-- load jQuery -->
		// <!-- load jQuery form plugin https://github.com/malsup/form -->

		// <script>
		//   var YOUTUBE_API_TOKEN = 'YOUR_TOKEN_HERE';
		//   var YOUTUBE_VID_CATEGORY_ID = 24; // "entertainment" as an example
		//   var YOUTUBE_VID_PRIVACY_STATUS = 'unlisted';
		  
		//   $('#upload-yt-video').ajaxForm({
		//     success: function(res, status) { 
		//       if (status !== 'success' || ! res.id) {
		//         console.error('problem uploading the video, response status:', status, 'response:', res);
		//         return;
		//       }
		  
		//       console.log('form submission successful, video uploaded to youtube! response:', res);
		  
		//       updateYouTubeVideo({
		//         id: res.id,
		//         token: YOUTUBE_API_TOKEN,
		//         title: $('#upload-yt-video [name=title]').val(),
		//         description: $('#upload-yt-video [name=description]').val()
		//       }, function(err, res) {
		//         if (err) {
		//           console.error('problem uploading the video - error while updating video attributes after upload:', err);
		//         }
		//         else {
		//           console.log('video updated! upload complete. response:', res);
		//         }
		//       });
		//     },
		//     error: function() {
		//       console.error('form submission failed', arguments);
		//     }
		//   });
		  
		//   function updateYouTubeVideo(args, cb) {
		//     if (!args || !args.id || !args.token) {
		//       console.error('missing args: must at least include id and token');
		//       return;
		//     }
		  
		//     var apiArgs = {
		//       id: args.id,
		//       snippet: {
		//         description: args.description || '',
		//         title: args.title || 'Video ' + new Date().toDateString(),
		//         categoryId: YOUTUBE_VID_CATEGORY_ID
		//       },
		//       status: {
		//         privacyStatus: YOUTUBE_VID_PRIVACY_STATUS
		//       }
		//     };
		  
		//     $.ajax({
		//       type: 'PUT',
		//       url: 'https://www.googleapis.com/youtube/v3/videos?part=snippet,status',
		//       contentType: 'application/json',
		//       headers: {
		//           Authorization: 'Bearer ' + args.token
		//       },
		//       data: JSON.stringify(apiArgs),
		//       dataType: 'text',
		//       success: function(data) {
		//         if ($.type(data) === "string") data = JSON.parse(data);
		//         cb(null, data);
		//       },
		//       error: function(request, err){
		//         cb(err);
		//       }
		//     });
		//   }
});