/ **
 * StyleFix 1.0.3 y 1.0.7 PrefixFree
* @author  Lea Verou
 * Licencia MIT
 * /

( Funci�n () {

si ( ! ventana . addEventListener ) {
	volver ;
}

var auto =  ventana . StyleFix  = {
	enlace :  funci�n ( enlace ) {
		var url =  enlace . href  ||  enlace . getAttribute ( ' data-href ' );
		tratar {
			// Ignorar hojas de estilo con atributo de datos-noprefix as� como hojas de estilo alternos o sin (Data-) atributo href
			si ( ! url ||  enlace . rel  ! ==  ' hoja de estilo '  ||  enlace . hasAttribute ( ' data-noprefix ' )) {
				volver ;
			}
		}
		captura (e) {
			volver ;
		}

		var de base =  url . sustituir ( / [ ^ \ / ] + $ / , ' ' ),
		    base_scheme = ( / ^ [ az ] {3,10} : / . exec (base) || [ ' ' ]) [ 0 ],
		    base_domain = ( / ^ [ az ] {3,10} : \ / \ / [ ^ \ / ] + / . exec (base) || [ ' ' ]) [ 0 ],
		    base_query = / ^ ( [ ^ ?] * ) \? ? / . exec (url) [ 1 ], 
		    matriz =  enlace . parentNode ,
		    xhr =  nuevo  XMLHttpRequest (),
		    proceso ;

		xhr . onreadystatechange  =  funci�n () {
			si ( xhr . readyState  ===  4 ) {
				proceso ();
			}
		};

		proceso  =  funci�n () {
				var css =  xhr . responseText ;

				si (CSS &&  enlace . parentNode  && ( ! xhr . estado  ||  xhr . estado  <  400  ||  xhr . estado de  >  600 )) {
					css =  auto . fijar (css, verdadero , enlace);

					// Convertir URL relativos a absoluta, si es necesario
					si (css && base) {
						css =  css . sustituir ( / url \ ( \ s *? ((:?" | ') ? ) ( . ? + ) \ 1 \ s *? \) / GI , la funci�n ( $ 0 , cita , url ) {
							si ( / ^ ( [ az ] {3,10} : | #) / i . de prueba (url)) { // absoluta y relativa o hash
								devolver $ 0;
							}
							otra cosa  si ( / ^ \ / \ / / . de prueba (url)) { // Esquema relativa
								// Puede contener secuencias como /../ y /./ pero los que hacer el trabajo
								retorno  ' url ( " '  + base_scheme + url +  ' ") ' ;
							}
							otra cosa  si ( / ^ \ / / . de prueba (url)) { // Dominio relativa
								retorno  ' url ( " '  + base_domain + url +  ' ") ' ;
							}
							otra cosa  si ( / ^ \? / . de prueba (url)) { // Consulta-relativa
								retorno  ' url ( " '  + base_query + url +  ' ") ' ;
							}
							otra cosa {
								// relativa a la trayectoria
								retorno  ' url ( " '  + de base + url +  ' ") ' ;
							}
						});

						// URL comportamiento shoudn't ser convertidos (Issue # 19)
						// base debe ser escapado antes de a�adirse a RegExp (Issue # 81)
						var escaped_base =  base de . sustituir ( / ( [ \\\ ^ \ $ * + [ \] {}? . = :( |)!] ) / g , " \\ $ 1 " );
						css =  css . sustituir ( RegExp ( ' \\ b (comportamiento: \\ s * url? \\ ( \' ")?? '  + escaped_base, ' gi ' ), ' $ 1 ' );
						}

					var estilo =  documento . createElement ( ' estilo ' );
					estilo . textContent  =  ' / * # sourceURL = ' + enlace . getAttribute ( ' href ' ) + ' * / \ n / * @ sourceURL = ' + enlace . getAttribute ( ' href ' ) + ' * / \ n '  + css;
					estilo . medios de comunicaci�n  =  enlace . medios de comunicaci�n ;
					estilo . discapacitados  =  enlace . personas con discapacidad ;
					estilo . setAttribute ( ' data-href ' , enlace . getAttribute ( ' href ' ));

					si ( enlace . ID ) de estilo . ID  =  enlace . Identificaci�n ;

					los padres . insertBefore (estilo, enlace);
					los padres . removeChild (enlace);

					estilo . medios de comunicaci�n  =  enlace . medios de comunicaci�n ; // duplicados es intencional. Ver la edici�n # 31
				}
		};

		tratar {
			xhr . abierto ( ' GET ' , url);
			xhr . enviar ( nulo );
		} Catch (e) {
			// Retorno a XDomainRequest si est� disponible
			si ( typeof XDomainRequest ! =  " indefinido " ) {
				xhr =  nuevo  XDomainRequest ();
				xhr . onerror  =  xhr . onProgress  =  funci�n () {};
				xhr . onload  =  proceso ;
				xhr . abierta ( " GET " , url);
				xhr . enviar ( nulo );
			}
		}

		enlace . setAttribute ( ' data-inprogress ' , ' ' );
	},

	styleElement :  funci�n ( estilo ) {
		si ( el estilo . hasAttribute ( ' data-noprefix ' )) {
			volver ;
		}
		var discapacitados =  estilo . personas con discapacidad ;

		estilo . textContent  =  auto . fijar ( estilo . textContent , verdadero , el estilo);

		estilo . discapacitados  = desactivado;
	},

	styleAttribute :  funci�n ( elemento ) {
		var css =  elemento . getAttribute ( ' estilo ' );

		css =  auto . fix (css, falso , elemento);

		elemento . setAttribute ( ' estilo ' , css);
	},

	proceso :  funci�n () {
		// hojas de estilo Vinculados
		$ ( ' Enlace [rel = "stylesheet"]: no ([datos inprogress]) ' ). forEach ( StyleFix . enlace );

		// hojas de estilo Inline
		$ ( ' Estilo ' ). forEach ( StyleFix . styleElement );

		// Estilos en l�nea
		$ ( ' [Estilo] ' ). forEach ( StyleFix . styleAttribute );
	},

	registrarse :  funci�n ( fijador , �ndice ) {
		( Auto . Fijadores  =  auto . Fijadores  || [])
			. empalme (�ndice ===  indefinido ?  auto . fijadores . longitud  : �ndice, 0 , fijador);
	},

	fix :  funci�n ( css , cruda , elemento ) {
		si ( auto . fijadores ) {
		  para ( var i = 0 ; i < auto . fijadores . longitud ; i ++ ) {
			css =  auto . fijadores [i] (css, crudo, elemento) || css;
		  }
		}

		volver css;
	},

	camelCase :  funci�n ( str ) {
		volver  str . sustituir ( / - ( [ az ] ) / g , funci�n ( $ 0 , $ 1 ) { volver  $ 1 . toUpperCase ();}). sustituir ( ' - ' , ' ' );
	},

	deCamelCase :  funci�n ( str ) {
		volver  str . sustituir ( / [ AZ ] / g , la funci�n ( $ 0 ) { retorno  ' - '  +  $ 0 . toLowerCase ()});
	}
};

/ **************************************
 * Proceso de estilos
 ************************************** /
( Funci�n () {
	setTimeout ( funci�n () {
		$ ( ' Enlace [rel = "stylesheet"] ' ). forEach ( StyleFix . enlace );
	}, 10 );

	documento . addEventListener ( ' DOMContentLoaded ' , StyleFix . proceso , falsa );
}) ();

la funci�n  $ ( expr , con ) {
	volver []. rebanada . llamada ((CON ||  documento ). querySelectorAll (expr));
}

}) ();

/ **
 * PrefixFree
 * /
( Funci�n ( ra�z ) {

si ( ! ventana . StyleFix  ||  ! ventana . getComputedStyle ) {
	volver ;
}

// auxiliar privado
la funci�n  del arreglo ( lo que , antes , despu�s , la sustituci�n , css ) {
	lo = auto [lo];

	si ( lo . de longitud ) {
		var regex =  RegExp (antes +  ' ( '  +  qu� . unen ( ' | ' ) +  ' ) '  + despu�s, ' gi ' );

		css =  css . sustituir (expresiones regulares, reemplazo);
	}

	volver css;
}

var auto =  ventana . PrefixFree  = {
	prefixCSS :  funci�n ( css , cruda , elemento ) {
		var prefijo =  auto . prefijo ;

		// Gradiente �ngulos de revisi�n
		si ( auto . funciones . indexOf ( ' -gradiente lineal ' ) >  - 1 ) {
			// Los gradientes son compatibles con un prefijo, convertir los �ngulos a la herencia
			css =  css . sustituir ( / ( \ s | : | ,) (repeating-) ? -gradiente lineal \ ( \ s * (- ? \ d * . \ ? \ d * ) deg / ig , la funci�n ( $ 0 , delim , repitiendo , deg ) {
				volver delim + (repitiendo ||  ' ' ) +  ' linear-gradiente ( '  + ( 90 - DEG) +  ' � ' ;
			});
		}

		css =  fix ( ' funciones ' , ' ( \\ S |: |,) ' , ' \\ s * \\ ( ' , ' $ 1 '  + prefijo +  ' $ 2 ( ' , css);
		css =  fix ( ' palabras clave ' , ' ( \\ S | :) ' , ' ( \\ S |; | \\ } | $) ' , ' $ 1 '  + prefijo +  ' $ 2 $ 3 ' , css);
		css =  fix ( ' propiedades ' , ' (^ | \\ {| \\ S |;) ' , ' \\ S *: ' , ' $ 1 '  + prefijo +  ' $ 2: ' , css);

		// propiedades de prefijo * * dentro de los valores (edici�n # 8)
		si ( auto . propiedades . de longitud ) {
			var regex =  RegExp ( ' \\ b ( '  +  auto . propiedades . unirse ( ' | ' ) +  ' ) (?! :) ' , ' gi ' );

			css =  fix ( ' valueProperties ' , ' \\ b ' , ' : (+);.? ' , la funci�n ( $ 0 ) {
				devolver  $ 0 . sustituir (expresiones regulares, prefijo +  " $ 1 " )
			}, Css);
		}

		si (en bruto) {
			css =  fix ( ' selectores ' , ' ' , ' \\ b ' , auto . prefixSelector , css);
			css =  fix ( ' atrules ' , ' @ ' , ' \\ b ' , ' @ '  + prefijo +  ' $ 1 ' , CSS);
		}

		// Fijar doble fijaci�n previa
		css =  css . sustituir ( RegExp ( ' - '  + prefijo, ' g ' ), ' - ' );

		// comod�n Prefijo
		css =  css . sustituir ( / - \ * - (=? [ az ] + ) / GI , s� . prefijo );

		volver css;
	},

	Propiedad :  funci�n ( propiedad ) {
		retorno ( auto . propiedades . indexOf (propiedad) > = 0  ?  s� . prefijo  :  ' ' ) + propiedad;
	},

	Valor :  la funci�n ( valor , la propiedad ) {
		valor =  fix ( ' funciones ' , ' (^ | \\ S |,) ' , ' \\ s * \\ ( ' , ' $ 1 '  +  auto . prefix  +  ' $ 2 ( ' , valor);
		valor =  fix ( ' palabras clave ' , ' (^ | \\ s) ' , ' ( \\ S | $) ' , ' $ 1 '  +  auto . prefijo  +  ' $ 2 $ 3 ' , valor);

		si ( auto . valueProperties . indexOf (propiedad) > =  0 ) {
			valor =  fix ( ' propiedades ' , ' (^ | \\ S |,) ' , ' ($ | \\ S |,) ' , ' $ 1 ' + auto . prefijo + ' $ 2 $ 3 ' , valor);
		}

		volver valor;
	},

	prefixSelector :  funci�n ( Selector ) {
		volver  auto . selectorMap [Selector] || selector
	},

	// Advertencia: Los prefijos no importa qu�, incluso si la propiedad est� soportado prefijo de menos
	prefixProperty :  funci�n ( propiedad , camelCase ) {
		var prefijo =  auto . prefijo  + propiedad;

		volver camelCase ?  StyleFix . camelCase (prefijo) : el prefijo;
	}
};

/ **************************************
 * Propiedades
 ************************************** /
( Funci�n () {
	var prefijos = {},
		propiedades = [],
		taquigraf�as = {},
		estilo =  getComputedStyle ( documento . documentElement , nula ),
		ficticio =  documento . createElement ( ' div ' ). estilo ;

	// Por qu� estamos haciendo esto en lugar de iterar sobre las propiedades de un objeto .style? Debido a Webkit.
	// 1. Mayor Webkit no iterar sobre ellos.
	// 2. Webkit recientes voluntad, sino la 'propiedades prefijadas-Webkit' no son numerables. El 'webkit'
	//     los (min�sculas 'w') son, pero no `deCamelCase ()` en un prefijo que podemos detectar.

	var  iterate  =  funci�n ( propiedad ) {
		si ( la propiedad . charAt ( 0 ) ===  ' - ' ) {
			propiedades . empuje (propiedad);

			var partes =  propiedad . divisi�n ( ' - ' ),
				prefijo = partes [ 1 ];

			// utiliza el n�mero de prefijo
			prefijos [prefix] =  ++ prefijos [prefijo] ||  1 ;

			// Esto ayuda taquigraf�as determinantes
			mientras que ( partes . longitud  >  3 ) {
				partes . pop ();

				var taquigraf�a =  partes . unirse a ( ' - ' );

				si ( soportados (taquigraf�a) &&  propiedades . indexOf (abreviada) ===  - 1 ) {
					propiedades . empujar (abreviada);
				}
			}
		}
	},
	apoyado  =  funci�n ( propiedad ) {
		volver  StyleFix . camelCase (propiedad) en maniqu�;
	}

	// Algunos navegadores tienen �ndices num�ricos de las propiedades, otros no
	si (estilo &&  estilo . longitud  >  0 ) {
		para ( var i = 0 ; i < estilo . longitud ; i ++ ) {
			iterate (estilo [i])
		}
	}
	otra cosa {
		para ( var propiedad de estilo) {
			iterate ( StyleFix . deCamelCase (propiedad));
		}
	}

	// Encuentra m�s utilizado prefijo
	var m�s altos = {utiliza : 0 };
	para ( var prefijo en prefijos) {
		var utiliza = prefijos [prefix];

		si ( m�s alto . usos  < usos) {
			m�s altos = {prefijo : prefijo, utiliza : usos};
		}
	}

	uno mismo . prefijo  =  ' - '  +  m�s alto . prefijo  +  ' - ' ;
	uno mismo . Prefijo  =  StyleFix . camelCase ( auto . prefijo );

	uno mismo . propiedades  = [];

	// obtener las propiedades s�lo est� soportado con un prefijo
	para ( var i = 0 ; i < propiedades . longitud ; i ++ ) {
		var propiedad = propiedades [i];

		si ( la propiedad . indexOf ( auto . prefijo ) ===  0 ) { // que podr�a tener m�ltiples prefijos, como Opera
			var sin prefijo =  propiedad . rebanada ( auto . prefijo . longitud );

			si ( ! soportado (sin prefijo)) {
				uno mismo . propiedades . empuje (sin prefijo);
			}
		}
	}

	// soluci�n IE
	si ( auto . Prefijo  ==  ' Ms '
	  &&  ! ( ' Transformar '  en ficticio)
	  &&  ! ( ' MsTransform '  en ficticio)
	  && ( ' msTransform '  en ficticio)) {
		uno mismo . propiedades . empuje ( ' transformar ' , ' transformar-origen ' );
	}

	uno mismo . propiedades . tipo ();
}) ();

/ **************************************
 * Valores
 ************************************** /
( Funci�n () {
// Los valores que podr�an necesitar un prefijo
var funciones = {
	' Linear-gradiente ' : {
		Propiedad :  ' BackgroundImage ' ,
		params :  ' rojo, verde azulado '
	},
	' Calc ' : {
		propiedad :  ' ancho ' ,
		params :  ' 1px + 5% '
	},
	' Elemento ' : {
		Propiedad :  ' BackgroundImage ' ,
		params :  ' #foo '
	},
	' Cross-fade ' : {
		Propiedad :  ' BackgroundImage ' ,
		params :  ' url (a.png), url (b.png), 50% '
	},
	' Imagen-set ' : {
		Propiedad :  ' BackgroundImage ' ,
		params :  ' url (a.png) 1x, url (b.png) 2x '
	}
};


funciones [ ' repitiendo lineal-gradiente ' ] =
funciones [ ' repitiendo-radial-gradiente ' ] =
funciones [ ' radial de gradiente ' ] =
funciones [ ' linear-gradiente ' ];

// Nota: Las propiedades asignadas son s�lo para el apoyo * prueba *.
// Las palabras clave ser�n precedidos por todas partes.
var palabras clave = {
	' Inicial ' :  ' colores ' ,
	' Agarrar ' :  ' cursor ' ,
	' Agarrar ' :  ' cursor ' ,
	' Zoom-in ' :  ' cursor ' ,
	' Alejamiento ' :  ' cursor ' ,
	' Cuadro ' :  ' pantalla ' ,
	' FlexBox ' :  ' pantalla ' ,
	' Inline-FlexBox ' :  ' pantalla ' ,
	' Flex ' :  ' pantalla ' ,
	' Inline-flex ' :  ' pantalla ' ,
	' Rejilla ' :  ' display ' ,
	' Inline-rejilla ' :  ' display ' ,
	' Max-contenido ' :  ' ancho ' ,
	' Min-contenido ' :  ' ancho ' ,
	' Fit-contenido ' :  ' ancho ' ,
	' Llenar-disponible ' :  ' ancho ' ,
	' Contener-flotadores ' :  ' ancho '
};

uno mismo . funciones  = [];
uno mismo . palabras clave  = [];

var estilo =  documento . createElement ( ' div ' ). estilo ;

funci�n de  apoyo ( valor , propiedad ) {
	estilo [propiedad] =  ' ' ;
	estilo [propiedad] = valor;

	volver  !! estilo [propiedad];
}

para ( var func en funciones) {
	var prueba = funciones [FUNC],
		propiedad =  prueba . la propiedad ,
		valor = func +  ' ( '  +  prueba . params  +  ' ) ' ;

	si ( ! soportado (valor de la propiedad)
	  &&  apoyado ( auto . Prefijo  + valor, la propiedad)) {
		// Es compatible, pero con un prefijo
		uno mismo . funciones . empuje (func);
	}
}

para ( var palabra clave en palabras clave) {
	var propiedad = palabras clave [palabra clave];

	si ( ! soportado (palabra clave, la propiedad)
	  &&  apoyado ( auto . Prefijo  + palabra clave, la propiedad)) {
		// Es compatible, pero con un prefijo
		uno mismo . palabras clave . empujar (palabra clave);
	}
}

}) ();

/ **************************************
 * Los selectores y @ -normas
 ************************************** /
( Funci�n () {

var
selectores = {
	' : Cualquier enlace ' :  nula ,
	' :: tel�n de fondo ' :  nula ,
	' : Pantalla completa ' :  nula ,
	' : Pantalla completa ' :  ' : pantalla completa ' ,
	// suspiro
	' :: marcador de posici�n ' :  nula ,
	' : Marcador de posici�n ' :  ' :: marcador de posici�n ' ,
	' :: entrada-marcador de posici�n ' :  ' :: marcador de posici�n ' ,
	' : Entrada-marcador de posici�n ' :  ' :: marcador de posici�n ' ,
	' : S�lo lectura ' :  nula ,
	' : Lectura-escritura ' :  nula ,
	' :: selecci�n ' :  nula
},

atrules = {
	' Fotogramas clave ' :  ' nombre ' ,
	' Ventana ' :  nula ,
	' Documento ' :  ' expresi�n regular ( "") '
};

uno mismo . selectores  = [];
uno mismo . selectorMap  = {};
uno mismo . atrules  = [];

var estilo =  ra�z . appendChild ( documento . createElement ( ' estilo ' ));

funci�n de  apoyo ( selector ) {
	estilo . textContent  = selector +  ' {} ' ;  // Safari 4 tiene problemas con style.innerHTML

	volver  !! estilo . la hoja . cssRules . longitud ;
}

para ( var selector en selectores) {
	var est�ndar = selectores [selector] || selector
	var prefijo =  selector . sustituir ( / :: ? / , la funci�n ( $ 0 ) { volver $ 0 +  auto . prefijo })
	si ( ! soportado (est�ndar) &&  apoyado (con el prefijo)) {
		uno mismo . selectores . empuje (est�ndar);
		uno mismo . selectorMap [standard] = prefijado;
	}
}

para ( var atrule en atrules) {
	var prueba = atrule +  '  '  + (atrules [atrule] ||  ' ' );

	si ( ! soportado ( ' @ '  + prueba) &&  apoyado ( ' @ '  +  auto . prefijo  + prueba)) {
		uno mismo . atrules . empuje (atrule);
	}
}

ra�z . removeChild (estilo);

}) ();

// Las propiedades que aceptan propiedades como su valor
uno mismo . valueProperties  = [
	' Transici�n ' ,
	' De transici�n de propiedad ' ,
	' Voluntad de cambio '
]

// Agregar clase para prefijo actual
ra�z . className  + =  '  '  +  auto . prefijo ;

StyleFix . registrarse ( auto . prefixCSS );


}) ( Documento . DocumentElement );