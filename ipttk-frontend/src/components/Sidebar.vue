<template>
  <nav>
    <div class="list" v-if="userType === 2">
      <router-link to="/add-point">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24">
            <path id="flag" class="cls-1" d="M20.186,10,24.43,3.826A.4.4,0,0,0,24.1,3.2h-12V1.6a.4.4,0,0,0-.4-.4H3.3V.4a.4.4,0,1,0-.8,0V23.6a.4.4,0,1,0,.8,0v-10H7.71a1.979,1.979,0,0,0-.41,1.2,2,2,0,0,0,2,2H24.1a.4.4,0,0,0,.33-.626ZM3.3,2h8V12.8h-8Zm6,14a1.2,1.2,0,1,1,0-2.4h2.4a.4.4,0,0,0,.4-.4V4H23.34L19.37,9.774a.4.4,0,0,0,0,.453L23.34,16Z" transform="translate(-2.5)"/>
        </svg>
        Dodaj punkt</router-link>
      <router-link to="/add-segment">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22.255">
          <path id="map" class="cls-1" d="M23.818,2.082a.433.433,0,0,0-.393-.06L15.689,4.6l-7.3-1.717a.379.379,0,0,0-.055,0,.444.444,0,0,0-.14,0L.342,4.629A.436.436,0,0,0,0,5.055V23.818a.437.437,0,0,0,.436.436.466.466,0,0,0,.095-.01L8.3,22.518l7.332,1.294a.406.406,0,0,0,.076.007.438.438,0,0,0,.154-.029h0l7.855-3.055A.438.438,0,0,0,24,20.327V2.437A.436.436,0,0,0,23.818,2.082ZM.873,5.4,7.855,3.853v17.87L.873,23.274ZM8.727,3.86,15.273,5.4V22.861L8.727,21.707Zm14.4,16.169-6.982,2.715V5.369l6.982-2.327Z" transform="translate(0 -2)"/>
      </svg>
      Dodaj odcinek</router-link>
    </div>
    <div class="list" v-if="userType === 1">
      <router-link to="/verify-routes">
        <svg id="outline-transfer_within_a_station-24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 25">
          <path id="Path_21" data-name="Path 21" class="cls-2" d="M0,0H27V25H0Z"/>
          <path id="Path_22" data-name="Path 22" class="cls-1" d="M18.663,16.151V14.32L15.8,16.936l2.863,2.616V17.721H25v-1.57ZM22.137,20.6H15.8v1.57h6.337V24L25,21.384l-2.863-2.616ZM10.625,5.686a2.21,2.21,0,0,0,2.3-2.093,2.21,2.21,0,0,0-2.3-2.093,2.21,2.21,0,0,0-2.3,2.093A2.21,2.21,0,0,0,10.625,5.686ZM6.312,9.244,3.15,24H5.565l2.012-8.372,2.472,2.093V24h2.3V16.1L9.992,13.953l.69-3.14a8.346,8.346,0,0,0,6.268,2.721V11.442a6.037,6.037,0,0,1-5-2.564L10.855,7.2A2.3,2.3,0,0,0,8.9,6.209a2.507,2.507,0,0,0-.863.157L2,8.616v4.919H4.3V10.029l2.012-.785"/>
        </svg>
        Weryfikuj trasy</router-link>
    </div>
    <div class="list" v-if="userType === 0">
      <router-link to="/routes">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22.255">
          <path id="map" class="cls-1" d="M23.818,2.082a.433.433,0,0,0-.393-.06L15.689,4.6l-7.3-1.717a.379.379,0,0,0-.055,0,.444.444,0,0,0-.14,0L.342,4.629A.436.436,0,0,0,0,5.055V23.818a.437.437,0,0,0,.436.436.466.466,0,0,0,.095-.01L8.3,22.518l7.332,1.294a.406.406,0,0,0,.076.007.438.438,0,0,0,.154-.029h0l7.855-3.055A.438.438,0,0,0,24,20.327V2.437A.436.436,0,0,0,23.818,2.082ZM.873,5.4,7.855,3.853v17.87L.873,23.274ZM8.727,3.86,15.273,5.4V22.861L8.727,21.707Zm14.4,16.169-6.982,2.715V5.369l6.982-2.327Z" transform="translate(0 -2)"/>
        </svg>
        Moje trasy
      </router-link>
      <router-link to="/add-route">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 24">
          <path id="flag" class="cls-1" d="M20.186,10,24.43,3.826A.4.4,0,0,0,24.1,3.2h-12V1.6a.4.4,0,0,0-.4-.4H3.3V.4a.4.4,0,1,0-.8,0V23.6a.4.4,0,1,0,.8,0v-10H7.71a1.979,1.979,0,0,0-.41,1.2,2,2,0,0,0,2,2H24.1a.4.4,0,0,0,.33-.626ZM3.3,2h8V12.8h-8Zm6,14a1.2,1.2,0,1,1,0-2.4h2.4a.4.4,0,0,0,.4-.4V4H23.34L19.37,9.774a.4.4,0,0,0,0,.453L23.34,16Z" transform="translate(-2.5)"/>
        </svg>
        Dodaj trasę
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['userType']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  nav {
    width: 250px;
    display: flex;
    align-items: center;
  }
  .list {
    display: flex;
    flex-direction: column;
  }
  a {
    font-size: 18px;
    color: rgba(24, 41, 78, 0.5);
    text-decoration: none;
    margin: 10px 0;
    font-weight: 500;
  }
  .router-link-active {
    color: rgb(24, 41, 78);
  }
  svg {
    margin-bottom: -2px;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .router-link-active svg .cls-1 {
    fill: rgba(20,33,61);
  }
  svg path.cls-1 {
    fill: rgba(24, 41, 78, 0.55);
  }
  svg path.cls-2 {
    fill: none;
  }
</style>
