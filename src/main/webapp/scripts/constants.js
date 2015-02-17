'use strict';

/* Constants */

springBootApp.constant('ROLES', {
    'admin': 'ADMIN',
    'user': 'USER'
});

/*
 Languages codes are ISO_639-1 codes, see http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 They are written in English to avoid character encoding issues (not a perfect solution)
 */
springBootApp.constant('LANGUAGES', {
    'en': 'English',
    'fr': 'French',
    'es': 'Spanish'
});

springBootApp.constant('ROLES', {
    'admin': 'ADMIN',
    'user': 'USER'
});

springBootApp
    .constant('ENV', 'prod')
    .constant('REFRESH_TIME', 5000)
    .constant('VERSION', '1.1.2');
