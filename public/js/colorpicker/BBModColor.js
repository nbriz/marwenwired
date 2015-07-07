// color maths -------------------------------------


	    function BBModColor(r, g, b, a) {
	        
	        this.r = r || 0;
	        this.g = g || 0;
	        this.b = b || 0;
	        this.a = a || 255;

	        this._HSV_from_RGB();

	        this.schemes = {
	        	'monochromatic' : [],
	        	'analogous' : [],
	        	'complementary' : [],
	        	'split complementary' : [],
	        	'triadic' : [],
	        	'tetradic' : []
	        };
	    }

	    BBModColor.prototype.setRGBA = function(r, g, b, a) {

	        if (r !== undefined) this.r = r;
	        if (g !== undefined) this.g = g;
	        if (b !== undefined) this.b = b;
	        if (a !== undefined) this.a = a;

	        this._HSV_from_RGB();
	    }
	    
	    BBModColor.prototype.setHSVA = function(h, s, v, a) {

	        if (h !== undefined) this.h = h;
	        if (s !== undefined) this.s = s;
	        if (v !== undefined) this.v = v;
	        if (a !== undefined) this.a = a;

	        this._RGB_from_HSV();
	    }

	   	BBModColor.prototype.getRGB = function() { 
			return 'rgb('+this.r+', '+this.g+', '+this.b+')';
		}

	   	BBModColor.prototype.getRGBA = function() { 
			return 'rgba('+this.r+', '+this.g+', '+this.b+', '+this.a+')';
		}

	   	BBModColor.prototype.getHex = function() { 
			return "#" +((this.r << 16) | (this.g << 8) | this.b).toString(16);
		}

	    BBModColor.prototype.isEqual = function(color, excludeAlpha) {

	        if (! color || ! color instanceof BBModColor) {
	            throw new Error("BBModColor.isEqual: color parameter is not an instance of BBModColor");
	        }

	        if (excludeAlpha) {
	            return (this.r === color.r &&
	                    this.g === color.g &&
	                    this.b === color.b)
	        } else {
	            return (this.r === color.r &&
	                    this.g === color.g &&
	                    this.b === color.b &&
	                    this.a === color.a)
	        }
	    }

		BBModColor.prototype.min3 = function( a,b,c ) { 
			return ( a<b )   ?   ( ( a<c ) ? a : c )   :   ( ( b<c ) ? b : c ); 
		} 
		
		BBModColor.prototype.max3 = function( a,b,c ) { 
			return ( a>b )   ?   ( ( a>c ) ? a : c )   :   ( ( b>c ) ? b : c );
		}

	    BBModColor.prototype._HSV_from_RGB = function() { 

	        var hsv = new Object();
		    var max = this.max3( this.r, this.g, this.b );
		    var dif = max - this.min3( this.r, this.g, this.b );

		    hsv.saturation = (max==0.0) ? 0 : (100*dif/max);

		    if ( hsv.saturation == 0 ) hsv.hue = 0;
		    else if ( this.r==max ) hsv.hue = 60.0 * ( this.g-this.b )/dif;
		    else if ( this.g==max ) hsv.hue = 120.0+60.0 * ( this.b-this.r )/dif;
		    else if ( this.b==max ) hsv.hue = 240.0+60.0 * ( this.r-this.g )/dif;

		    if ( hsv.hue < 0.0 ) hsv.hue += 360.0;

		    this.h = Math.round( hsv.hue );			// hue
		    this.s = Math.round( hsv.saturation );	// saturation
		    this.v = Math.round( max*100/255 );		// value
	    }

	    BBModColor.prototype.rgb2hsv = function( rgb, g, b ) { 

	    	var self = ( rgb instanceof BBModColor ) ? rgb : { r:rgb, g:g, b:b };

	        var hsv = new Object();
		    var max = this.max3( self.r, self.g, self.b );
		    var dif = max - this.min3( self.r, self.g, self.b );

		    hsv.s = (max==0.0) ? 0 : (100*dif/max);

		    if ( hsv.s == 0 ) hsv.h = 0;
		    else if ( self.r==max ) hsv.h = 60.0 * ( self.g-self.b )/dif;
		    else if ( self.g==max ) hsv.h = 120.0+60.0 * ( self.b-self.r )/dif;
		    else if ( self.b==max ) hsv.h = 240.0+60.0 * ( self.r-self.g )/dif;

		    if ( hsv.h < 0.0 ) hsv.h += 360.0;

		    hsv.h = Math.round( hsv.h );			// hue
		    hsv.s = Math.round( hsv.s );	// saturation
		    hsv.v = Math.round( max*100/255 );		// value

		    return hsv;
	    }

	    BBModColor.prototype._RGB_from_HSV = function() { 

	    	var hsv = { h:this.h, s:this.s, v:this.v };
		    
		    if ( hsv.s == 0 ) {

		        this.r = this.g = this.b = Math.round( hsv.v * 2.55 );

		    } else {

		        hsv.h /= 60;
		        hsv.s /= 100;
		        hsv.v /= 100;
		        
		        var i = Math.floor( hsv.h );
		        var f = hsv.h - i;
		        var p = hsv.v * ( 1- hsv.s );
		        var q = hsv.v * ( 1 - hsv.s * f );
		        var t = hsv.v * ( 1 - hsv.s * (1-f) );
		        
		        switch( i ) {
		        	case 0: this.r = hsv.v; this.g = t; this.b = p; break;
		        	case 1: this.r = q; this.g = hsv.v; this.b = p; break;
		        	case 2: this.r = p; this.g = hsv.v; this.b = t; break;
		        	case 3: this.r = p; this.g = q; this.b = hsv.v; break;
		        	case 4: this.r = t; this.g = p; this.b = hsv.v; break;
		        	default: this.r = hsv.v; this.g = p; this.b = q;
		        }

		        this.r = Math.round(this.r * 255);
		        this.g = Math.round(this.g * 255);
		        this.b = Math.round(this.b * 255);
		    }
	    }

	    BBModColor.prototype.hsv2rgb = function( hsv, s, v ) { 

	    	var hsv = ( hsv instanceof BBModColor ) ? hsv : { h:hsv, s:s, v:v };

	    	var rgb = new Object();
		    
		    if ( hsv.s == 0 ) {

		        rgb.r = rgb.g = rgb.b = Math.round( hsv.v * 2.55 );

		        return rgb;

		    } else {

		        hsv.h /= 60;
		        hsv.s /= 100;
		        hsv.v /= 100;
		        
		        var i = Math.floor( hsv.h );
		        var f = hsv.h - i;
		        var p = hsv.v * ( 1- hsv.s );
		        var q = hsv.v * ( 1 - hsv.s * f );
		        var t = hsv.v * ( 1 - hsv.s * (1-f) );
		        
		        switch( i ) {
		        	case 0: rgb.r = hsv.v; rgb.g = t; rgb.b = p; break;
		        	case 1: rgb.r = q; rgb.g = hsv.v; rgb.b = p; break;
		        	case 2: rgb.r = p; rgb.g = hsv.v; rgb.b = t; break;
		        	case 3: rgb.r = p; rgb.g = q; rgb.b = hsv.v; break;
		        	case 4: rgb.r = t; rgb.g = p; rgb.b = hsv.v; break;
		        	default: rgb.r = hsv.v; rgb.g = p; rgb.b = q;
		        }

		        rgb.r = Math.round(rgb.r * 255);
		        rgb.g = Math.round(rgb.g * 255);
		        rgb.b = Math.round(rgb.b * 255);

		        return rgb;
		    }
	    }

	    //

		BBModColor.prototype._hueShift = function( h,s ) { 
			
			h += s; 
			
			while ( h>=360.0 ) 	h -= 360.0; 
			while ( h<0.0 ) 	h += 360.0; 

			return h; 
		}

		BBModColor.prototype._schemeVarient = function( rgb, scheme, config ) { 

			
			if( typeof config.tint !== "undefined" ){

				config.tint.sort(function(a,b){return b - a}); // reorder largest to smallest

				for (var i = 0; i < config.tint.length; i++) {
					var col = new Object();														
					col.r = Math.round( rgb.r+(255-rgb.r ) * config.tint[i] );
					col.g = Math.round( rgb.g+(255-rgb.g ) * config.tint[i] );
					col.b = Math.round( rgb.b+(255-rgb.b ) * config.tint[i] );
					col.a = this.a;

					this.schemes[scheme].push( col );
				};

			}

			this.schemes[scheme].push({ r:rgb.r, g:rgb.g, b:rgb.b, a:this.a });
			
			if( typeof config.shade !== "undefined" ){
				
				config.shade.sort(function(a,b){return b - a}); // reorder largest to smallest

				for (var i = 0; i < config.shade.length; i++) {
					var col = new Object();														
					col.r = Math.round( rgb.r * config.shade[i] );
					col.g = Math.round( rgb.g * config.shade[i] );
					col.b = Math.round( rgb.b * config.shade[i] );
					col.a = this.a;

					this.schemes[scheme].push( col );
				};
			}

			for (var i = 0; i < this.schemes[scheme].length; i++) {
				var self = this.schemes[scheme][i];
					self.hex = "#" +((self.r << 16) | (self.g << 8) | self.b).toString(16);
					self.rgb = 'rgb('+self.r+', '+self.g+', '+self.b+')';
					self.rgba = 'rgba('+self.r+', '+self.g+', '+self.b+', '+self.a+')';
			};
		}

		// config.angle = "30"; config.tint = [ 0.4, 0.8 ]; config.shade = [ 0.3, 0.6 ]

		BBModColor.prototype.colorScheme = function( scheme, config ) { 
			
			if( scheme == "monochromatic" ){ // -----------------------------------------------------------
				if(typeof config !== "object"){
					
					throw new Error("BBModColor.colorScheme: expecting a config object");
				
				} else {				
					this.schemes[scheme] = []; // clear previous colors
					this._schemeVarient( this, scheme, config);
				}
			}

			if( scheme == "analogous" ){ // -----------------------------------------------------------
				if(typeof config !== "object"){
					
					throw new Error("BBModColor.colorScheme: expecting a config object");
				
				} else {

					if( typeof config.angle == "undefined" ){

						throw new Error("BBModColor.colorScheme: this scheme requires a config object with an angle property");

					}

					this.schemes[scheme] = []; // clear previous colors

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, config.angle 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 0.0-config.angle );
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);
				}
			}


			if( scheme == "complementary" ){ // -----------------------------------------------------------
				if(typeof config !== "object"){
					
					throw new Error("BBModColor.colorScheme: expecting a config object");
				
				} else {

					this.schemes[scheme] = []; // clear previous colors

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 180 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);
				}
			}


			if( scheme == "split complementary" ){ // -----------------------------------------------------------
				if(typeof config !== "object"){
					
					throw new Error("BBModColor.colorScheme: expecting a config object");
				
				} else {

					if( typeof config.angle == "undefined" ){

						throw new Error("BBModColor.colorScheme: this scheme requires a config object with an angle property");
					}

					this.schemes[scheme] = []; // clear previous colors

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 180.0-config.angle);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 180.0+config.angle);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);
				}
			}

			if( scheme == "triadic" ){ // -----------------------------------------------------------
				if(typeof config !== "object"){
					
					throw new Error("BBModColor.colorScheme: expecting a config object");
				
				} else {

					if( typeof config.angle == "undefined" ){

						throw new Error("BBModColor.colorScheme: this scheme requires a config object with an angle property");
					}

					this.schemes[scheme] = []; // clear previous colors

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 240 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 120 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);
				}
			}

			if( scheme == "tetradic" ){ // -----------------------------------------------------------
				if(typeof config !== "object"){
					
					throw new Error("BBModColor.colorScheme: expecting a config object");
				
				} else {

					if( typeof config.angle == "undefined" ){

						throw new Error("BBModColor.colorScheme: this scheme requires a config object with an angle property");
					}

					this.schemes[scheme] = []; // clear previous colors

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, 180 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);

					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, -config.angle 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);
					
					var rgb 	= { r:this.r, g:this.g, b:this.b };
					var hsv 	= this.rgb2hsv( 	rgb.r, rgb.g, rgb.b 	);
						hsv.h 	= this._hueShift( 	hsv.h, -config.angle+180.0 	);
						rgb 	= this.hsv2rgb( 	hsv.h, hsv.s, hsv.v 	);

					this._schemeVarient( rgb, scheme, config);					
				}
			}			


		}

		// Object { r: 204, g: 51, b: 153, a: 255, v: 80, h: 320, s: 75 }
