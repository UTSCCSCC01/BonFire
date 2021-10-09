<template>
  <div class="home">
    <div class="section section-header">
      <div
        class="parallax orange d-flex justify-content-center align-items-center"
      >
        <div
          class="image"
          style="background-image: url('assets/img/header-1.jpeg')"
        />
        <div class="container">
          <div class="content">
            <div class="title-area">
              <p>Welcome To</p>
              <h1
                class="title-modern white--text"
                style="font-weight: 600; text-shadow: none;"
              >
                Bonfire
              </h1>
              <h3 style="font-weight: 600; text-shadow: none;">
                Organizational Tool for both Teachers and Students
                <div class="separator line-separator">
                  ♦
                </div>
              </h3>
            </div>

            <div class="button-get-started">
              <router-link
                to="/register"
                class="btn btn-white btn-fill btn-lg"
              >
                Get Started Today
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="container">
        <div class="row">
          <div class="title-area">
            <h2>What we do</h2>
            <div class="separator separator-danger">
              ✻
            </div>
            <p class="description">
              Welcome to BonFire, a kanban-board web app designed and created by
              students with one purpose: providing students and teachers with a
              simple feature-rich interface to keep track of their classes and
              class-work. Throughout Covid-19, it has become more apparent how
              difficult it is to keep track of assignments for online and in
              person classes. We hope to implement features on top of kanban
              functionality to solve this issue
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div class="info-icon">
              <div class="icon text-danger">
                <i class="pe-7s-graph1" />
              </div>
              <h3>Create</h3>
              <p class="description">
                Create your own spaces, boards, and more to keep track of you
                classes and class-work
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info-icon">
              <div class="icon text-danger">
                <i class="pe-7s-note2" />
              </div>
              <h3>Customize</h3>
              <p class="description">
                With our custom framework, customize your space to suit your
                needs
              </p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="info-icon">
              <div class="icon text-danger">
                <i class="pe-7s-music" />
              </div>
              <h3>Organize</h3>
              <p class="description">
                Live life stress free by organizing your class-work, assignment,
                homework, and more
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="section section-our-team-freebie">
      <div class="parallax orange">
        <div
          class="image"
          style="background-image: url('../assets/img/header-2.jpeg')"
        />
        <div class="container">
          <div class="content">
            <div class="row">
              <div class="title-area">
                <h2 class="white--text">
                  Who We Are
                </h2>
                <div class="separator separator-danger white--text">
                  ✻
                </div>
                <p class="description white--text">
                  We are a small team of student developers who want to make the
                  classroom better, more organized and more creative
                </p>
              </div>
            </div>

            <div class="team">
              <div class="row d-flex justify-content-center align-items-center">
                <div class="col-md-10 col-md-offset-1">
                  <div
                    class="row"
                    style="justifyContent: center;"
                  >
                    <div class="col-md-4">
                      <div class="card card-member">
                        <div class="content">
                          <div class="avatar avatar-danger">
                            <img
                              alt="..."
                              class="img-circle"
                              src="../assets/img/faces/ahmed.png"
                            >
                          </div>
                          <div class="description">
                            <h3 class="title">
                              Ahmed
                            </h3>
                            <p class="description">
                              Full Stack Developer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card card-member">
                        <div class="content">
                          <div class="avatar avatar-danger">
                            <img
                              alt="..."
                              class="img-circle"
                              src="../assets/img/faces/mohamed.png"
                            >
                          </div>
                          <div class="description">
                            <h3 class="title">
                              Mohamed
                            </h3>
                            <p class="description">
                              Full Stack Developer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card card-member">
                        <div class="content">
                          <div class="avatar avatar-danger">
                            <img
                              alt="..."
                              class="img-circle"
                              src="../assets/img/faces/armand.png"
                            >
                          </div>
                          <div class="description">
                            <h3 class="title">
                              Armand
                            </h3>
                            <p class="description">
                              Frontend Developer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card card-member">
                        <div class="content">
                          <div class="avatar avatar-danger">
                            <img
                              alt="..."
                              class="img-circle"
                              src="../assets/img/faces/christian.png"
                            >
                          </div>
                          <div class="description">
                            <h3 class="title">
                              Christian
                            </h3>
                            <p class="description">
                              Frontend Developer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card card-member">
                        <div class="content">
                          <div class="avatar avatar-danger">
                            <img
                              alt="..."
                              class="img-circle"
                              src="../assets/img/faces/david.png"
                            >
                          </div>
                          <div class="description">
                            <h3 class="title">
                              David
                            </h3>
                            <p class="description">
                              Fullstack Developer
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      links: [
        { name: "Register", to: "/register" },
        { name: "Sign In", to: "/signin" },
      ],
    };
  },
  mounted() {
    console.log(this.links);
  },
};
</script>


<style lang="scss" scoped>
.space {
  height: 130px;
  display: block;
}
.space-110 {
  height: 110px;
  display: block;
}
.space-50 {
  height: 50px;
  display: block;
}
.space-70 {
  height: 70px;
  display: block;
}
.space-100 {
  height: 100px;
  display: block;
  width: 100%;
}
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
.info.info-separator {
  position: relative;
}
.info.info-separator:after {
  height: 100%;
  position: absolute;
  background-color: #ccc;
  width: 1px;
  content: "";
  right: -7px;
  top: 0;
}
@media (max-width: 767px) {
  .info.info-separator:after {
    display: none;
  }
}
.info .description .btn {
  width: 240px;
  font-weight: 500;
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
  font-family: Cambo, "Times New Roman", serif;
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
  font-family: Cambo, "Times New Roman", serif;
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
p {
  font-size: 14px;
  line-height: 1.6em;
  font-weight: 400;
  margin: 0 0 0.75em;
}
.btn,
.btn-simple,
.title h5,
a,
p,
small {
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
.title p {
  color: #777;
}
.title-modern {
  font-family: Poppins, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 200;
}
.text-info {
  color: #00abc0 !important;
}
.text-danger {
  color: #e78b90 !important;
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
.separator-danger {
  color: #e78b90;
}
.separator-danger:after,
.separator-danger:before {
  border-color: #e78b90;
}
p.description {
  font-size: 16px;
  color: #777;
}
a:focus,
a:hover {
  text-decoration: none;
}
a:active,
a:focus,
button::-moz-focus-inner {
  outline: 0;
}
[data-toggle="collapse"] i {
  -webkit-transition: all 150ms linear;
  -moz-transition: all 150ms linear;
  -o-transition: all 150ms linear;
  -ms-transition: all 150ms linear;
  transition: all 150ms linear;
}
.info-icon {
  text-align: center;
}
.info-icon .icon {
  font-size: 62px;
  line-height: 66px;
  color: #c5a47e;
  margin-bottom: 10px;
}
.info-icon .description {
  margin-top: 15px;
  color: #777;
}
.avatar {
  border: 3px solid #c5a47e;
  border-radius: 50%;
  overflow: hidden;
  max-width: 110px;
  margin: 0 auto;
}
.avatar img {
  width: 100%;
  height: auto;
}
.avatar-danger {
  border-color: #e78b90;
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
.card .icon {
  font-size: 75px;
  line-height: 75px;
}
.card .icon ~ h3 {
  margin-top: 5px;
  margin-bottom: 0;
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
.btn.btn-fill {
  color: #fff;
  background-color: #888;
  opacity: 1;
}
.btn.btn-fill:active,
.btn.btn-fill:focus,
.btn.btn-fill:hover {
  background-color: #777;
  color: #fff;
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
.btn.btn-icon {
  padding: 10px;
}
.btn-danger {
  border-color: #e78b90;
  color: #e78b90;
}
.btn-danger:active,
.btn-danger:focus,
.btn-danger:hover {
  background-color: transparent;
  color: #e47a80;
  border-color: #e47a80;
}
.btn-danger:disabled,
.btn-danger[disabled] {
  background-color: transparent;
  border-color: #e78b90;
}
.btn-danger.btn-fill {
  color: #fff;
  background-color: #e78b90;
  opacity: 1;
}
.btn-danger.btn-fill:active,
.btn-danger.btn-fill:focus,
.btn-danger.btn-fill:hover {
  background-color: #e47a80;
  color: #fff;
}
.btn-white {
  border-color: #fff;
  color: #fff;
  opacity: 0.9;
}
.btn-white:active,
.btn-white:focus,
.btn-white:hover {
  background-color: transparent;
  color: #fff;
  border-color: #fff;
}
.btn-white:disabled,
.btn-white[disabled] {
  background-color: transparent;
  border-color: #fff;
}
.btn-white.btn-fill {
  color: #fff;
  background-color: #fff;
  opacity: 1;
}
.btn-white.btn-fill:active,
.btn-white.btn-fill:focus,
.btn-white.btn-fill:hover {
  background-color: #fff;
  color: #fff;
}
.btn-white:active {
  background-color: #fff;
  color: #888;
}
.btn-white.btn-fill {
  color: #888;
  opacity: 0.9;
}
.btn-white.btn-fill:focus,
.btn-white.btn-fill:hover {
  color: #888;
  opacity: 1;
}
.btn-white.btn-simple:active {
  background-color: transparent;
}
.btn:disabled,
.btn[disabled] {
  opacity: 0.5;
}
.btn-simple {
  border: 0;
  font-size: 14px;
  padding: 10px 20px;
}
.btn-simple.btn-icon {
  padding: 10px;
}
.btn-lg {
  font-size: 14px;
  border-radius: 4px;
  padding: 16px 32px;
}
.btn-lg.btn-simple {
  padding: 18px 32px;
}
.section {
  padding: 50px 0;
  position: relative;
  background-color: #fff;
}
.section-white {
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
.section .title-area .description {
  font-size: 16px;
  color: #777;
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
.section .text-area .description,
.section .text-area .description p {
  font-size: 16px;
  color: #777;
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
.section .parallax-small {
  height: 65vh;
}
.section-our-team .text-area {
  padding-bottom: 0;
}
.section-white {
  padding: 0;
}
.section-get-started .parallax .image,
.section-small .parallax .image {
  height: 100vh !important;
}
.section-info {
  padding-top: 100px;
}
.section-we-do h3 {
  margin: 10px 0 20px;
}
.section-we-do h5 {
  margin-bottom: 0;
}
.section-we-do p {
  color: #777;
}
.section-we-do .title {
  margin-bottom: 70px;
}
.card {
  background: #fff;
  box-shadow: 0 32px 44px -24px rgba(0, 0, 0, 0.23),
    0 20px 25px 0 rgba(0, 0, 0, 0.12), 0 15px 10px -10px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  margin-bottom: 30px;
  -webkit-transition: all 370ms cubic-bezier(0.34, 1.61, 0.7, 1);
  -moz-transition: all 370ms cubic-bezier(0.34, 1.61, 0.7, 1);
  -o-transition: all 370ms cubic-bezier(0.34, 1.61, 0.7, 1);
  -ms-transition: all 370ms cubic-bezier(0.34, 1.61, 0.7, 1);
  transition: all 370ms cubic-bezier(0.34, 1.61, 0.7, 1);
}
.card:not(.card-plain):not(.card-price):hover {
  -webkit-transform: scale(1.03);
  -moz-transform: scale(1.03);
  -o-transform: scale(1.03);
  -ms-transform: scale(1.03);
  transform: scale(1.03);
  box-shadow: 0 26px 50px -10px rgba(0, 0, 0, 0.38),
    0 10px 20px 0 rgba(0, 0, 0, 0.2), 0 15px 10px -10px rgba(0, 0, 0, 0.2);
}
.card a {
  opacity: 0.85;
}
.card:hover .header {
  opacity: 1;
}
.card h2 {
  margin-top: 0;
}
.card img {
  max-width: 100%;
}
.card .header img {
  border-radius: 4px;
}
.card .header img,
.card .image-header {
  width: 100%;
  border-radius: 4px 4px 0 0;
}
.card .header img.image-full,
.card .image-header.image-full {
  border-radius: 4px;
}
.card .row .header img,
.card .row .image-header {
  width: 100%;
  border-radius: 4px;
}
.card .btn {
  margin-top: 15px;
}
.card > img {
  border-radius: 4px;
}
.card .title {
  margin-bottom: 5px;
  color: #333;
}
.card .description {
  font-size: 13px;
}
.card-member {
  display: block;
  text-align: center;
  margin-bottom: 20px;
}
.card-member .content {
  padding: 25px;
}
.card-member > img {
  background: none repeat scroll 0 0 transparent;
  height: auto;
  width: 120px;
  margin: 0 auto;
}
.card-white {
  background: #fff;
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
.section-header p {
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 1em 0 0.5em;
}
.section-header .separator {
  color: #fff;
  margin: 30px auto;
}
.section-header .separator.line-separator:after,
.section-header .separator.line-separator:before {
  border-color: #fff;
}
.section-header-small .parallax {
  min-height: 50vh;
  height: auto;
}
.section-team-1 {
  padding-top: 0;
}
.section-team-1 .container {
  position: absolute;
  width: 100%;
  top: 0;
}
.section-team-1 .text-area {
  background-color: transparent;
  max-width: 760px;
  margin: 0 auto;
}
.section-team-1 p {
  color: #555;
}
.section-team-2 {
  padding-top: 0;
}
.section-team-2 .team-text {
  position: relative;
  padding: 0 0 75px;
}
.section-team-2 .team {
  display: block;
  position: relative;
}
.section-team-2 .team .member {
  border-radius: 50%;
  display: block;
  text-align: center;
}
.section-team-2 .team .member p {
  font-size: 1em;
}
.section-team-2 .team .member img {
  background: none repeat scroll 0 0 transparent;
  height: auto;
  width: 120px;
  margin: 0 auto;
}
.section-team-2 .team .description {
  padding: 10px 0;
  text-align: center;
}
.section-team-3 .team {
  margin-bottom: 50px;
}
.section-team-3 .team .member {
  text-align: center;
}
.section-team-3 .team .member img {
  margin: 0 auto;
}
.section-team-4 {
  padding-top: 5em;
}
.section-team-4 .team {
  text-align: center;
  padding: 10px 0;
}
.section-team-4 .team .member {
  padding: 0 10px;
}
.section-team-4 .team .member img {
  width: 120px;
  height: 120px;
  margin: 0 auto;
}
.section-team-4 .team .member .description {
  padding: 10px 0;
}
.description {
  margin-bottom: 20px;
}
.small-text {
  color: #777;
  text-align: center;
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
.section-get-started,
.section-header-freebie,
.section-our-team-freebie {
  padding-bottom: 0;
}
.section-get-started .container,
.section-header-freebie .container,
.section-our-team-freebie .container {
  position: relative;
  z-index: 100;
  display: block;
  margin-top: 30vh;
  text-align: center;
}
.section-get-started .title-header,
.section-header-freebie .title-header,
.section-our-team-freebie .title-header {
  text-transform: none;
}
.section-get-started .text-description,
.section-header-freebie .text-description,
.section-our-team-freebie .text-description {
  color: #fff;
  margin: 40px auto;
  max-width: 760px;
}
.section-get-started .text-white,
.section-header-freebie .text-white,
.section-our-team-freebie .text-white {
  color: #fff;
}
.section-get-started .parallax,
.section-header-freebie .parallax,
.section-our-team-freebie .parallax {
  height: auto;
}
.section-get-started .image,
.section-header-freebie .image,
.section-our-team-freebie .image {
  height: 100%;
}
.section-get-started {
  padding: 0;
}
.section-get-started .container {
  margin: 15vh auto;
}
.member .description {
  min-height: 100px;
}
.section-header-freebie {
  padding: 0;
}
.section-our-team-freebie .container {
  margin-top: 14vh;
  margin-bottom: 50px;
}
.card p {
  min-height: 0;
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
  .section-header .content h5,
  .section-header .content p {
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
@media (max-width: 930px) {
  .section.section-our-team .title-description,
  .section.section-we-do .title-description {
    max-width: 550px;
    margin: 0 auto;
  }
  .section.section-we-do .text-description {
    max-width: 420px;
    margin: 0 auto;
  }
}
@media (max-width: 992px) {
  .section.section-we-are .description {
    max-width: 560px;
    text-align: center;
    margin: 0 auto;
  }
  .text-center {
    margin-top: 20px;
  }
  .section.section-info {
    height: auto;
  }
}
</style>

