package com.posada.service;

import com.posada.model.Enum.RoomCategory;
import com.posada.model.Enum.RoomType;
import com.posada.model.Hotel;
import com.posada.model.HotelRoom;
import com.posada.model.Room;
import com.posada.model.Sale;
import com.posada.model.User;
import com.posada.repository.HotelRepository;
import com.posada.repository.HotelRoomRepository;
import com.posada.repository.RoomRepository;
import com.posada.repository.UserRepository;
import com.posada.service.interfaces.ISaleService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
class SaleServiceTest {

  @Autowired
  private ISaleService saleService;

  @Autowired
  private HotelRepository hotelRepository;

  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private HotelRoomRepository hotelRoomRepository;

  @Autowired
  private UserRepository userRepository;

  private HotelRoom hotelRoom;
  private User user;

  @BeforeEach
  void setUp() {
    Hotel hotel = hotelRepository.save(hotelForTest());
    Room room = roomRepository.save(roomForTest());

    HotelRoom hr = new HotelRoom();
    hr.setHotel(hotel);
    hr.setRoom(room);
    hr.setQuantity(1);
    hotelRoom = hotelRoomRepository.save(hr);

    user = userRepository.save(userForTest());
  }

  @Test
  void calculaElPrecioTotalSegunLasNochesYElPrecioDeLaHabitacion() {
    Sale sale = saleRequest(LocalDate.of(2026, 10, 1), LocalDate.of(2026, 10, 4));

    Sale guardada = saleService.save(sale);

    assertThat(guardada.getTotalPrice()).isEqualByComparingTo("300000");
  }

  @Test
  void rechazaUnaSegundaReservaQueSeCruzaConLaPrimeraCuandoNoQuedanUnidades() {
    saleService.save(saleRequest(LocalDate.of(2026, 10, 1), LocalDate.of(2026, 10, 5)));

    Sale segundaSuperpuesta = saleRequest(LocalDate.of(2026, 10, 3), LocalDate.of(2026, 10, 6));

    assertThatThrownBy(() -> saleService.save(segundaSuperpuesta))
        .isInstanceOf(IllegalStateException.class)
        .hasMessageContaining("disponibilidad");
  }

  @Test
  void permiteReservarLaMismaHabitacionEnFechasQueNoSeCruzan() {
    saleService.save(saleRequest(LocalDate.of(2026, 10, 1), LocalDate.of(2026, 10, 5)));

    Sale segundaSinCruce = saleRequest(LocalDate.of(2026, 10, 5), LocalDate.of(2026, 10, 8));

    Sale guardada = saleService.save(segundaSinCruce);

    assertThat(guardada.getId()).isNotNull();
  }

  @Test
  void rechazaUnaReservaConFechaDeSalidaAntesDeLaDeEntrada() {
    Sale sale = saleRequest(LocalDate.of(2026, 10, 10), LocalDate.of(2026, 10, 5));

    assertThatThrownBy(() -> saleService.save(sale))
        .isInstanceOf(IllegalArgumentException.class);
  }

  private Sale saleRequest(LocalDate start, LocalDate end) {
    Sale sale = new Sale();
    sale.setUser(user);
    sale.setHotelRoom(hotelRoom);
    sale.setStartDate(start);
    sale.setEndDate(end);
    sale.setTotalPrice(BigDecimal.ONE);
    return sale;
  }

  private Hotel hotelForTest() {
    Hotel hotel = new Hotel();
    hotel.setName("Hotel de prueba " + System.nanoTime());
    hotel.setCity("Bogotá");
    hotel.setAddress("Calle 1");
    hotel.setNit("NIT-" + System.nanoTime());
    hotel.setMaxRooms(10);
    return hotel;
  }

  private Room roomForTest() {
    Room room = new Room();
    room.setType(RoomCategory.ESTANDAR);
    room.setAccommodation(RoomType.SENCILLA);
    room.setPrice(new BigDecimal("100000"));
    return room;
  }

  private User userForTest() {
    User u = new User();
    u.setFullName("Usuario de prueba");
    u.setDocumentNumber("DOC-" + System.nanoTime());
    u.setDocumentType("CC");
    u.setEmail(System.nanoTime() + "@test.com");
    u.setPhone("3000000000");
    u.setPassword("hash");
    return u;
  }
}
