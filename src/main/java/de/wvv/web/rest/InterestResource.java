package de.wvv.web.rest;

import de.wvv.domain.Interest;
import de.wvv.repository.InterestRepository;
import de.wvv.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link de.wvv.domain.Interest}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class InterestResource {

    private final Logger log = LoggerFactory.getLogger(InterestResource.class);

    private static final String ENTITY_NAME = "interest";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InterestRepository interestRepository;

    public InterestResource(InterestRepository interestRepository) {
        this.interestRepository = interestRepository;
    }

    /**
     * {@code POST  /interests} : Create a new interest.
     *
     * @param interest the interest to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new interest, or with status {@code 400 (Bad Request)} if the interest has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/interests")
    public ResponseEntity<Interest> createInterest(@RequestBody Interest interest) throws URISyntaxException {
        log.debug("REST request to save Interest : {}", interest);
        if (interest.getId() != null) {
            throw new BadRequestAlertException("A new interest cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Interest result = interestRepository.save(interest);
        return ResponseEntity.created(new URI("/api/interests/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /interests} : Updates an existing interest.
     *
     * @param interest the interest to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated interest,
     * or with status {@code 400 (Bad Request)} if the interest is not valid,
     * or with status {@code 500 (Internal Server Error)} if the interest couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/interests")
    public ResponseEntity<Interest> updateInterest(@RequestBody Interest interest) throws URISyntaxException {
        log.debug("REST request to update Interest : {}", interest);
        if (interest.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Interest result = interestRepository.save(interest);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, interest.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /interests} : get all the interests.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of interests in body.
     */
    @GetMapping("/interests")
    public List<Interest> getAllInterests() {
        log.debug("REST request to get all Interests");
        return interestRepository.findAll();
    }

    /**
     * {@code GET  /interests/:id} : get the "id" interest.
     *
     * @param id the id of the interest to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the interest, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/interests/{id}")
    public ResponseEntity<Interest> getInterest(@PathVariable Long id) {
        log.debug("REST request to get Interest : {}", id);
        Optional<Interest> interest = interestRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(interest);
    }

    /**
     * {@code DELETE  /interests/:id} : delete the "id" interest.
     *
     * @param id the id of the interest to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/interests/{id}")
    public ResponseEntity<Void> deleteInterest(@PathVariable Long id) {
        log.debug("REST request to delete Interest : {}", id);
        interestRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
