(function () {
    'use strict';

    var script = document.createElement('script');
    script.src = 'redstone_quiz.js?v=20260630';
    script.async = false;

    var current = document.currentScript;
    var parent = current && current.parentNode ? current.parentNode : (document.head || document.documentElement);
    parent.appendChild(script);
})();
