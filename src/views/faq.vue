<template>
  <!-- test -->
  <div class="fapInd">
    <div class="sub-title">FAQ</div>
    <div class="message-wrapper" v-for="item in qaList" :key="item.id">
      <div class="message incoming">
        <span class="avatar">Q:</span>
        <div class="message-text">
          <p>{{ item.question }}</p>
        </div>
      </div>
      <div class="message outgoing">
        <div class="message-text">
          <p>{{ item.answer }}</p>
        </div>
        <span class="avatar">:A</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Faq",
  data() {
    return {
      qaList: [
        {
          id: 1,
          question: "How can I reserve an item?",
          answer: "How can I reserve an item?",
        },
        {
          id: 2,
          question: "What happens after I reserve an item?",
          answer: "What happens after I reserve an item?",
        },
        {
          id: 3,
          question: "Where can I see my proposais and their state?",
          answer: "here can I see my surrent bookings and reservations?",
        },
        {
          id: 4,
          question: "Who can I contact if I have further questions?",
          answer: "Who can I contact if I have further questions?",
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.sub-title {
  font-size: 22px;
  color: #215110;
  text-align: center;
  font-weight: bold;
}

.fapInd {
  height: 100%;
  padding: 20px 20px 20px 16px;
  border-radius: 5px;

  .message-wrapper {
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 20px;
    background-color: #f1f0f0;
    border-radius: 5px;
  }

  .message {
    display: flex;
    max-width: 400px;
  }

  .outgoing {
    align-self: flex-end;

    .message-text {
      background-color: #3db147;
      color: #fff;
    }

    .avatar {
      margin-left: 10px;
    }
  }

  .incoming {
    align-self: flex-start;

    .message-text {
      background-color: #0657ec;
      color: #fff;
    }
  }

  .avatar {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    align-self: flex-end;
  }

  .message-text {
    border-radius: 18px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 450px;
  }

  .message-text p {
    margin: 0;
  }
}
</style>