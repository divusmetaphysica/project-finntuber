<template>
  <div class="page">
    <section>
      <h2>What is this website?</h2>
      <p>
        This is a site cataloguing all known Finnish virtual streamers. It's a volunteer project
        created by the Fintuber community and the fans. Our aim is to help you better discover
        streamers for you to enjoy.
      </p>
    </section>
    <section>
      <h2>What is a VTuber?</h2>
      <p>
        “VTuber” is an abbreviation for “Virtual Youtuber”, a streamer who uses some kind of an
        avatar instead of their own face. The avatar can be a simple image, a 3D model or a 2D model
        animated using Live2D technology. While the term originates from Youtube, it is nowadays
        used of all virtual streamers regardless of their streaming platform. Sometimes you may also
        see the term VStreamer.
      </p>
      <p>
        Anyone can start streaming as a VTuber, as all you need is an avatar. If you want to know
        more about the technologies involved, image avatars (often called just “png”) can be
        slightly animated using
        <a href="https://discord-reactive-images.fugi.tech/">Discord Reactive Images</a>,
        <a href="https://olmewe.itch.io/veadotube-mini">veadotube</a> or similar, 2D models are
        animated using <a href="https://www.live2d.com">Live2D Cubism</a> and for 3D models a
        popular choice is <a href="https://vroid.com">VRoid</a>.
      </p>
    </section>
    <section>
      <h2>Who counts as a Finnish VTuber?</h2>
      <p>
        The Fintuber community consists of all kinds of people who are Finnish, speak Finnish and/or
        live in Finland. So, you don't have to tick all three boxes - if you identify with being
        Finnish in some way, that's enough! As for the VTuber part, everyone who streams using an
        avatar instead of a facecam counts. We also have people who mix both VTuber and facecam
        streams, so as long as a considerable amount of your content is created using an avatar and
        you identify as a VTuber, you can be added to the list.
      </p>
    </section>
    <section>
      <h2>I'm a Finnish VTuber, how can I get added to the list?</h2>
      <p>
        The names of the creators of the website are listed at the bottom of the page. Message one
        of us and we'll get you added, and connect you with the rest of the community if you want!
      </p>
    </section>
    <section>
      <h2>Why is my "Last live" date wrong?</h2>
      <p>
        Twitch API doesn't actually offer any "last live" data, so the list uses the date of the
        latest published video for each streamer. So, if you had to take down your latest VOD,
        that's probably why.
      </p>
    </section>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dosis:wght@700&display=swap');
.page {
  padding: 0px 24px 50px 24px;
  color: midnightblue;
  margin: 0 auto;
  max-width: 1600px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 5px 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.7);
}

section:not(:last-child) {
  margin-bottom: 24px;
}

h2 {
  margin-bottom: 8px;
}

a {
  color: #3299d9;
  text-decoration: none;
  font-family: 'Dosis', sans-serif;
  font-size: 18px;
}
</style>
