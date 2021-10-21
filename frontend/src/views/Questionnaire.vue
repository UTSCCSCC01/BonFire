<template>
  <div class="home">
    <div class="section section-header">
      <div
        class="parallax orange d-flex justify-content-center align-items-center"
      >
        <div class="container">
          <div class="content">
            <div class="title-area">
              <h1
                class="title-modern white--text"
                style="font-weight: 600; text-shadow: none"
              >
                Bonfire
              </h1>
              <h3 style="font-weight: 600; text-shadow: none">
                Are you a Student or a Professor?
                <div class="separator line-separator">
                  ♦
                </div>
              </h3>
            </div>

            <v-btn
                class="mr-4"
                type="submit"
                large
                olor="primary"
                :disabled="!valid_form || loading"
                :loading="loading">
                
                Professor
            </v-btn>
            <v-btn
                class="mr-4"
                type="submit"
                large
                olor="primary" 
                :disabled="!valid_form || loading"
                :loading="loading">
                
                Student   
            </v-btn>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.parallax {
    width: 100%;
    height: 570px;
    display: block;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
}
.parallax .parallax-image {
    width: 100%;
    overflow: hidden;
    position: absolute;
}
.parallax .parallax-image img {
    width: 100%;
}
@media (max-width: 768px) {
    .parallax .parallax-image {
        width: 100%;
        height: 640px;
        overflow: hidden;
    }
    .parallax .parallax-image img {
        height: 100%;
        width: auto;
    }
}
.separator-line {
    background-color: #eee;
    height: 1px;
    width: 100%;
    display: block;
}
.img-container {
    width: 100%;
    overflow: hidden;
}
.img-container img {
    width: 100%;
}
@media (max-width: 768px) {
    .btn {
        margin-bottom: 10px;
    }
}
@-webkit-keyframes bounceInDown {
    0%,
    100%,
    60%,
    75%,
    90% {
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0);
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0);
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0);
        transform: translate3d(0, -10px, 0);
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0);
        transform: translate3d(0, 5px, 0);
    }
    100% {
        -webkit-transform: none;
        transform: none;
    }
}
@keyframes bounceInDown {
    0%,
    100%,
    60%,
    75%,
    90% {
        -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
        transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -3000px, 0);
        transform: translate3d(0, -3000px, 0);
    }
    60% {
        opacity: 1;
        -webkit-transform: translate3d(0, 25px, 0);
        transform: translate3d(0, 25px, 0);
    }
    75% {
        -webkit-transform: translate3d(0, -10px, 0);
        transform: translate3d(0, -10px, 0);
    }
    90% {
        -webkit-transform: translate3d(0, 5px, 0);
        transform: translate3d(0, 5px, 0);
    }
    100% {
        -webkit-transform: none;
        transform: none;
    }
}
body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-size: 100%;
}
@media (min-width: 58em) {
    body {
        font-size: 100%;
    }
}
@media (min-width: 115em) {
    body {
        font-size: 110%;
    }
}
@media (min-width: 125em) {
    body {
        font-size: 115%;
    }
}
@media (min-width: 145em) {
    body {
        font-size: 120%;
    }
}
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    body {
        font-feature-settings: normal;
    }
}
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
}
.h1 a,
.h2 a,
.h3 a,
.h4 a,
.h5 a,
.h6 a,
h1 a,
h2 a,
h3 a,
h4 a,
h5 a,
h6 a {
    font-size: inherit;
}
.h1,
h1 {
    font-size: 3em;
    line-height: 1.213483146em;
    font-weight: 700;
}
.h2,
h2 {
    font-size: 2.4em;
    line-height: 1.25;
    margin: 0.4em 0;
    font-weight: 700;
}
.h3,
h3 {
    font-size: 1.61em;
    line-height: 1.05em;
    margin-top: 15px;
    margin-bottom: 15px;
}
.h4,
h4 {
    font-size: 1.3em;
    line-height: 1.714285714em;
}
h5 {
    font-size: 1.2em;
}
.btn,
.title h5,
a {
    font-family: Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif;
}
a {
    color: #777;
    opacity: 0.7;
    font-size: 14px;
}
a:hover {
    color: #777;
    opacity: 1;
}
.title {
    text-align: center;
    margin-bottom: 50px;
}
.separator {
    color: #c5a47e;
    margin: 0 auto 20px;
    max-width: 240px;
    text-align: center;
    position: relative;
}
.separator:after,
.separator:before {
    display: block;
    width: 40%;
    content: " ";
    margin-top: 10px;
    border: 1px solid #c5a47e;
}
.separator:before {
    float: left;
}
.separator:after {
    float: right;
}
a:focus,
a:hover {
    text-decoration: none;
}
a:active,
a:focus {
    outline: 0;
}
::selection {
    background: #e78b90;
    color: #fff;
}
@-webkit-keyframes zoomOut {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    100% {
        opacity: 0;
    }
}
@keyframes zoomOut {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
        -webkit-transform: scale3d(0.3, 0.3, 0.3);
        transform: scale3d(0.3, 0.3, 0.3);
    }
    100% {
        opacity: 0;
    }
}
a {
    -webkit-transition: all 150ms linear;
    -moz-transition: all 150ms linear;
    -o-transition: all 150ms linear;
    -ms-transition: all 150ms linear;
    transition: all 150ms linear;
}
.btn {
    -webkit-transition: all 150ms ease-out;
    -moz-transition: all 150ms ease-out;
    -o-transition: all 150ms ease-out;
    -ms-transition: all 150ms ease-out;
    transition: all 150ms ease-out;
}
.btn {
    border-width: 1px;
    background-color: transparent;
    font-weight: 600;
    border-radius: 3px;
    font-size: 12px;
    line-height: 1.6em;
    opacity: 0.8;
    padding: 10px 20px;
    border-color: #888;
    color: #888;
    text-transform: uppercase;
}
.btn:active,
.btn:focus,
.btn:hover {
    background-color: transparent;
    color: #777;
    border-color: #777;
}
.btn:disabled,
.btn[disabled] {
    background-color: transparent;
    border-color: #888;
}
.btn:focus,
.btn:hover {
    opacity: 1;
    outline: 0 !important;
}
.btn:active {
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 0 !important;
}
.btn:disabled,
.btn[disabled] {
    opacity: 0.5;
}
.section {
    padding: 50px 0;
    position: relative;
    background-color: #fff;
}
.section {
    position: relative;
}
.section .title-area {
    max-width: 760px;
    margin: 0 auto 70px;
    display: block;
    padding: 0 15px;
    text-align: center;
}
.section [class*="col-"] .title-area {
    padding: 0;
}
.section .text-area {
    padding: 4.375em 0;
    position: relative;
    z-index: 3;
    display: block;
}
.section .parallax {
    width: 100%;
    height: 100vh;
    overflow: hidden;
    display: block;
    position: relative;
}
.section .parallax > img {
    min-width: 100%;
    min-height: 100%;
    width: auto;
    height: auto;
    position: relative;
    z-index: 1;
}
.section-header {
    padding: 0;
}
.section-header .container {
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%;
    display: block;
    top: 0;
}
.section-header .content {
    position: relative;
    color: #fff;
    text-align: center;
    text-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    vertical-align: center;
    line-height: 1.7;
    position: relative;
    top: 44%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
}
.section-header .btn {
    text-shadow: none;
}
.section-header h1 {
    font-weight: 400;
    font-size: 3.6em;
    text-shadow: -2px 2px 0 rgba(0, 0, 0, 0.3), -2px 4px 2px rgba(0, 0, 0, 0.1);
}
.section-header h5 {
    font-size: 1.3em;
    margin: 0 auto 0.5em;
    line-height: 1.5;
    letter-spacing: 0.125;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
}
.section-header .separator {
    color: #fff;
    margin: 30px auto;
}
.section-header .separator.line-separator:after,
.section-header .separator.line-separator:before {
    border-color: #fff;
}
.section .image {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    width: 100%;
    height: 100vh;
    z-index: 2;
    position: absolute;
    display: block;
}
@media (min-width: 768px) {
    .section-header .separator {
        max-width: 20em;
    }
}
@media (max-width: 992px) {
    .section-header {
        padding: 0 !important;
    }
    .section-header .parallax {
        height: 80vh;
    }
    .section-header .parallax:after {
        height: 80vh;
    }
    .section-header .content {
        top: 50%;
    }
    .section-header .content h1,
    .section-header .content h5 {
        margin: 0;
    }
    .section-header .content h1 {
        font-size: 4.5em;
        letter-spacing: 0.07em;
        line-height: 1.7;
    }
    .section-header .content h5 {
        font-size: 1.125em;
        margin-top: 50px;
    }
    .section-header .content .separator {
        width: 12em;
    }
}
@media (max-width: 768px) {
    h1 {
        font-size: 2em;
        line-height: 1.25;
    }
    h2 {
        font-size: 1.625em;
        line-height: 1.15384615;
    }
    h3 {
        font-size: 1.375em;
        line-height: 1.13636364;
    }
    h4 {
        line-height: 1.11111111;
    }
    .btn {
        margin: 0 auto 15px;
        float: none;
    }
}
@media (max-width: 992px) {
    .text-center {
        margin-top: 20px;
    }
}

</style>
